import { Request, Response } from "express";
import { DeleteTeamService } from "../../services/team/DeleteTeamService";

export class DeleteTeamController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const deleteTeamService = new DeleteTeamService();
            const result = await deleteTeamService.execute(id);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}