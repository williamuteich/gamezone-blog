import { Request, Response } from 'express';
import { GetAllUsersService } from '../../services/user/GetAllUsersService';

export class GetAllUserController {
  async handle(req: Request, res: Response) {
    try {
      const getAllUsersService = new GetAllUsersService();
      const users = await getAllUsersService.execute(req);
      return res.json(users);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
