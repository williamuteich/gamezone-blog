import { Request, Response } from 'express';
import { PutUserService } from '../../services/user/PutUserService';

export class PutUserController {
    async handle(req: Request, res: Response) {
        const { id, name, email, password, isAdmin, role, status } = req.body;
        
        // Se houver upload de avatar novo, usar o filename; senão, manter o existente
        const avatar = req.file ? req.file.filename : req.body.avatar;

        const putUserService = new PutUserService();
        try {
            const user = await putUserService.execute({ id, name, email, password, isAdmin, role, status, avatar });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}