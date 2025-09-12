import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authenticateUserService = new AuthenticateUserService();
      const { token } = await authenticateUserService.execute({ email, password });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
      });

      return res.json({
        token
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
