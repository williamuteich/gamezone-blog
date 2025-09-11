import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, isAdmin, role, status } = req.body;
    
    const avatar = req.file ? req.file.filename : req.body.avatar || null;

    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ 
        name, 
        email, 
        password, 
        isAdmin: isAdmin === 'true' || isAdmin === true, 
        role, 
        status: status === 'true' || status === true, 
        avatar 
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
