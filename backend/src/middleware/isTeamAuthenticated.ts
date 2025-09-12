import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../prisma";

interface TeamPayload {
  sub: string;
  role: string;
  name: string;
  email: string;
  avatar?: string;
  status: boolean;
  exp?: number;
}

export async function isTeamAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Middleware para autenticar APENAS membros da equipe (com role)
  // Verifica token válido, role válida e status ativo
  let token = req.headers.authorization?.split(" ")[1];

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Token de acesso obrigatório" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256']
    }) as TeamPayload;

    // Verificar se é token de equipe (deve ter 'role')
    if (!payload.role) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Token de usuário não permitido nesta rota" });
    }

    // Verificar se token está na blacklist usando hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: { token: tokenHash }
    });

    if (blacklistedToken) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Token invalidado" });
    }

    // Verificar se role é válida
    if (!["ADMIN", "EDITOR", "MODERATOR"].includes(payload.role)) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Role inválida" });
    }

    // Verificar se membro da equipe está ativo
    if (!payload.status) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Membro da equipe inativo" });
    }

    // Verificar expiração
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Token expirado" });
    }

    req.userID = payload.sub;
    return next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ error: "Token inválido" });
  }
}
