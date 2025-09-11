import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, isAdmin, role, status, avatar } = req.body;

    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ name, email, password, isAdmin, role, status, avatar });
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
