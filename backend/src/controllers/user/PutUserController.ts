import { Request, Response } from 'express';
import { PutUserService } from '../../services/user/PutUserService';

export class PutUserController {
    async handle(req: Request, res: Response) {
        
        const { id, name, email, password, status, avatarExistente } = req.body;
        
        const avatar = (req.file && req.file.size > 0) ? req.file.filename : (avatarExistente || req.body.avatar);
        
        const putUserService = new PutUserService();
        try {
            const user = await putUserService.execute({ 
                id, 
                name, 
                email, 
                password, 
                status: status === 'true' || status === true, 
                avatar 
            });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}