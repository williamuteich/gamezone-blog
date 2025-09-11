import { Request, Response } from 'express';
import { PutAffiliateService } from '../../services/affiliates/PutAffiliateService';

export class PutAffiliateController{
    async handle(req: Request, res: Response) {
        const { productUrl, status, ...otherData } = req.body;
        
        const imageUrl = req.file ? req.file.filename : req.body.imageUrl;
        
        const data = {
            ...otherData,
            ...(productUrl && { url: productUrl }),
            ...(imageUrl && { imageUrl }),
            ...(status !== undefined && { status: status === 'true' || status === true })
        };
        
        const putAffiliateService = new PutAffiliateService();

        try { 
            const affiliate = await putAffiliateService.execute({ data });
            
            return res.json({ message: affiliate });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}  