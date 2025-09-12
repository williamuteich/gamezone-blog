import { Request, Response } from "express";
import { PutTeamService } from "../../services/team/PutTemService";

export class PutAllTemController {
    async handle(req: Request, res: Response) {
        const { id, name, email, password, role, status } = req.body;

        const avatar = req.file ? req.file.filename : undefined;

        try {
            const putTeamService = new PutTeamService();
            const result = await putTeamService.execute({ id, name, email, password, role, status, avatar });
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}