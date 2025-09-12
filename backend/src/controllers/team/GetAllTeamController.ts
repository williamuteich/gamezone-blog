import { Request, Response } from 'express';
import { GetAllTeamService } from '../../services/team/GetAllTeamService';

export class GetAllTeamController {
    async handle(req: Request, res: Response) {
        const getAllTeamService = new GetAllTeamService();

        try {
            const result = await getAllTeamService.execute(req);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}