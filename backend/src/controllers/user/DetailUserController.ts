import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

export class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const userID = req.userID;
      const detailUserService = new DetailUserService();
      const user = await detailUserService.execute({ id: userID });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
