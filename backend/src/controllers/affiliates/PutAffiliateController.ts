import { Request, Response } from 'express';
import { PutAffiliateService } from '../../services/affiliates/PutAffiliateService';

export class PutAffiliateController{
    async handle(req: Request, res: Response) {
        const data = req.body;
        const putAffiliateService = new PutAffiliateService();

        try { 
            const affiliate = await putAffiliateService.execute({ data });
            
            return res.json({ message: affiliate });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}  