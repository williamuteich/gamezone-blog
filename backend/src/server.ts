import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { router } from './route';

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: true, 
  credentials: true, 
}))

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(process.env.PORT, () => console.log('Servidor online!'));
