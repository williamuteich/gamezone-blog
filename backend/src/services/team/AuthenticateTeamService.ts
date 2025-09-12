import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma';

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateTeamService {
  async execute({ email, password }: AuthenticateRequest) {
    if (!email || !password) {
      throw new Error('Invalid email or password');
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
