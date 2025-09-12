import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma';

export interface AuthenticateRequest {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export class AuthenticateTeamService {
  private async validateRecaptcha(token: string): Promise<boolean> {
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      if (!secretKey) {
        console.warn('RECAPTCHA_SECRET_KEY não configurada');
        return false;
      }

      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      });

      const data = await response.json();
      
      return data.success === true;
    } catch (error) {
      console.error('Erro na validação do reCAPTCHA:', error);
      return false;
    }
  }

  async execute({ email, password, recaptchaToken }: AuthenticateRequest) {
    if (!email || !password) {
      throw new Error('Invalid email or password');
    }

    if (recaptchaToken) {
      const isValidRecaptcha = await this.validateRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        throw new Error('Verificação reCAPTCHA inválida');
      }
    }

    const team = await prisma.team.findUnique({
      where: { email: email },
    });

    if (!team) {
      throw new Error('Invalid email or password');
    }

    if (!team.status) {
      throw new Error('Membro da equipe inativo. Contate o administrador.');
    }

    if (!['ADMIN', 'EDITOR', 'MODERATOR'].includes(team.role)) {
      throw new Error('Insufficient permissions to access admin area');
    }

    const passwordMatch = await bcrypt.compare(password, team.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        id: team.id,
        name: team.name,
        email: team.email,
        avatar: team.avatar,
        role: team.role,
        status: team.status,
        type: 'team'
      },
      process.env.JWT_SECRET,
      {
        subject: team.id,
        expiresIn: '1h',
      },
    );

    return {
      id: team.id,
      name: team.name,
      email: team.email,
      role: team.role,
      avatar: team.avatar,
      type: 'team',
      token
    };
  }
}
