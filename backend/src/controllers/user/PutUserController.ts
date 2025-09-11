import { Request, Response } from 'express';
import { PutUserService } from '../../services/user/PutUserService';

export class PutUserController {
    async handle(req: Request, res: Response) {
        const { id, name, email, password, isAdmin, role, status, avatar } = req.body;

        const putUserService = new PutUserService();
        try {
            const user = await putUserService.execute({ id, name, email, password, isAdmin, role, status, avatar });
            return res.json(user);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}