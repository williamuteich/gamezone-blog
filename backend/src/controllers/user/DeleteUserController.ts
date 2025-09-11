import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/user/DeleteUserService';

export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.body; 
        const deleteUserService = new DeleteUserService();

        try {
            await deleteUserService.execute({ id });
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}