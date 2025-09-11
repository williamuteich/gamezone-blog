import { Request, Response } from "express";
import { DeleteAffiliateService } from "../../services/affiliates/DeleteAffiliateService";

export class DeleteAffiliateController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;
        console.log(id)
        const deleteAffiliateService = new DeleteAffiliateService();
        try {
            const affiliate = await deleteAffiliateService.execute( id );
            
            return res.json(affiliate);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}