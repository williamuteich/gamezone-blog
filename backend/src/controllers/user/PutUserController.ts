import { Request, Response } from 'express';
import { PutUserService } from '../../services/user/PutUserService';

export class PutUserController {
    async handle(req: Request, res: Response) {
        const { id, name, email, password, isAdmin } = req.body;

        const putUserService = new PutUserService();
        try {
            const user = await putUserService.execute({ id, name, email, password, isAdmin });
            return res.json(user);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}