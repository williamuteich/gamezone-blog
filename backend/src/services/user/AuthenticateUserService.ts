import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma';

export interface AuthenticateRequest {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export class AuthenticateUserService {
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

    // Validar reCAPTCHA se fornecido
    if (recaptchaToken) {
      const isValidRecaptcha = await this.validateRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        throw new Error('Verificação reCAPTCHA inválida');
      }
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verificar se o usuário está ativo
    if (!user.status) {
      throw new Error('Usuário inativo. Contate o administrador.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token };
  }
}
