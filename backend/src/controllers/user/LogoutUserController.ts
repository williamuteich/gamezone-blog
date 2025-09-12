import { Request, Response } from 'express';
import { LogoutUserService } from '../../services/user/LogoutUserService';

export class LogoutUserController {
  async handle(req: Request, res: Response) {
    try {
      // Pegar token do cookie ou header
      let token = req.headers.authorization?.split(" ")[1];
      
      if (!token && req.cookies?.token) {
        token = req.cookies.token;
      }

      const logoutUserService = new LogoutUserService();
      const result = await logoutUserService.execute({ token });

      // Limpar cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}