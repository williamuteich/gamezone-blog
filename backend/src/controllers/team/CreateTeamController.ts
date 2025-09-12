import { Request, Response } from 'express';
import { CreateTeamService } from '../../services/team/CreateTeamService';

export class CreateTeamController {
    async handle(req: Request, res: Response) {
        const { name, role, email, password } = req.body;

        const avatar = req.file ? req.file.filename : null;

        try{
            const createTeamService = new CreateTeamService();
            const team = await createTeamService.execute({
                name,
                role,
                email,
                password,
                avatar
            })

            return res.json(team);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}