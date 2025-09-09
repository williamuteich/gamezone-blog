import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authenticateUserService = new AuthenticateUserService();
      const { id, name, email: userEmail, isAdmin, token } = await authenticateUserService.execute({ email, password });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        user: { id, name, email: userEmail, isAdmin },
        token
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
