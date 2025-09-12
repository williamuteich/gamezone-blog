import { Request, Response } from "express";
import { DetailTeamService } from "../../services/team/DetailTeamService";

export class DetailTeamController {
    async handle(req: Request, res: Response) {
        try {
            const userID = req.userID;
            const detailTeamService = new DetailTeamService();
            const result = await detailTeamService.execute(userID);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}