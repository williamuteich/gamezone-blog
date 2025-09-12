import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../../prisma';

export interface LogoutRequest {
  token: string;
}

export class LogoutUserService {
  async execute({ token }: LogoutRequest) {
    if (!token) {
      throw new Error('Token é obrigatório para logout');
    }

    try {
      // Decodificar token para obter informações
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // Verificar se é token de usuário (não deve ter role)
      if (decoded.role) {
        throw new Error('Token de equipe não permitido nesta rota de logout');
      }

      // Calcular data de expiração do token
      const expiresAt = new Date(decoded.exp * 1000);

      // Gerar hash do token para blacklist (mais eficiente que armazenar token completo)
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      // Adicionar hash do token à blacklist
      await prisma.blacklistedToken.create({
        data: {
          token: tokenHash,
          userId: decoded.sub,
          reason: 'logout',
          expiresAt,
        },
      });

      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Token inválido');
      }
      throw error;
    }
  }
}