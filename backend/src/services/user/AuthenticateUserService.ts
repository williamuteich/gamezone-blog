import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma';

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    if (!email || !password) {
      throw new Error('Invalid email or password');
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
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
        role: user.role,
        isAdmin: user.isAdmin,
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
