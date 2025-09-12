import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  sub: string;
  isAdmin: boolean;
  userID: string;
}


export function isTeamAuthenticated(req: Request, res: Response, next: NextFunction) {
  //resumindo: Basicamente se o token n estiver no header, ele tenta pegar do cookies
  //se n tiver em nenhum dos dois, retorna 401
  //se tiver, verifica se é valido e se o usuario é admin
  //se n for admin, retorna 403
  //se o token vier do header e for invalido, limpara o token do cookies no frontend
  //se o token vier do cookies e for invalido, retorna apenas o erro 401
  //se for valido, passa o userID para as rotas e chama o next()
  let token = req.headers.authorization?.split(" ")[1];

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    if (!payload.isAdmin) {
      return res.status(403).end();
    }

    req.userID = payload.sub;
    return next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).end();
  }
}
