import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import { router } from './route';
import { TokenCleanupService } from './services/TokenCleanupService';

const app = express();

app.use(helmet({
  crossOriginEmbedderPolicy: false, 
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], 
      scriptSrc: ["'self'", "'strict-dynamic'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"], 
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

const loginLimiter = rateLimit({
  windowMs: process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 5 * 60 * 1000,
  max: 5, 
  message: {
    error: process.env.NODE_ENV === 'production' 
      ? 'Muitas tentativas de login. Tente novamente em 15 minutos.'
      : 'Muitas tentativas de login. Tente novamente em 5 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por IP
  message: {
    error: 'Muitos requests. Tente novamente em 15 minutos.'
  }
});

app.use(express.json({ limit: '10mb' })); 
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
   
    const allowedOrigins = [
      'http://localhost:3000', 
      'http://127.0.0.1:3000', 
      'https://seublog.com',   
    ];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'), false);
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: [
    'Origin', 
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization'
  ], 
  maxAge: 86400, 
}))

app.use('/files/team', express.static('./tmp/team', {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 ano
  }
}));

app.use('/files/users', express.static('./tmp/users', {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 ano
  }
}));

app.use('/files/affiliates', express.static('./tmp/affiliates', {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 ano
  }
}));

app.use('/login', loginLimiter); 
app.use('/team/login', loginLimiter);
app.use(generalLimiter); 

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log estruturado para auditoria de segurança
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };
  
  console.error('Security/Error Log:', JSON.stringify(errorLog, null, 2));
  
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar job de limpeza de tokens
const tokenCleanup = new TokenCleanupService();
tokenCleanup.startCleanupJob();

app.listen(process.env.PORT, () => console.log('Servidor online!'));
