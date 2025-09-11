import { Request, Response } from 'express';
import { CreateAffiliateService } from '../../services/affiliates/CreateAffiliateService';

export class CreateAffiliatesController {
    async handle(req: Request, res: Response) {
        const { title, description, url, imageUrl, buttonName, status } = req.body;

        try {
            const createAffiliateService = new CreateAffiliateService();
            const affiliate = await createAffiliateService.execute({ title, description, url, imageUrl, buttonName, status });
            return res.json(affiliate);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}