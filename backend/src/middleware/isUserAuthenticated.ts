import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

interface UserPayload {
  sub: string;
  name: string;
  email: string;
  avatar?: string;
  status: boolean;
  exp?: number;
  // Note: NÃO deve ter 'role' - isso é exclusivo de Team
}

export async function isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Middleware para autenticar APENAS usuários normais (sem role)
  // Rejeita tokens de Team e verifica status ativo
  let token = req.headers.authorization?.split(" ")[1];

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Token de acesso obrigatório" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    // Verificar se é token de usuário (não deve ter 'role')
    if ('role' in payload) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Token de equipe não permitido nesta rota" });
    }

    // Verificar se token está na blacklist
    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: { token }
    });

    if (blacklistedToken) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Token invalidado" });
    }

    // Verificar se usuário está ativo
    if (!payload.status) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Usuário inativo" });
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