import { Request, Response } from 'express';
import { AuthenticateTeamService } from '../../services/team/AuthenticateTeamService';

export class AuthenticateTeamController {
  async handle(req: Request, res: Response) {
    const { email, password, recaptchaToken } = req.body;

    try {
      const authenticateTeamService = new AuthenticateTeamService();
      const { token } = await authenticateTeamService.execute({ email, password, recaptchaToken });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
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
