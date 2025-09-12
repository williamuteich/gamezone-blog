import { Request, Response } from 'express';
import { CreateAffiliateService } from '../../services/affiliates/CreateAffiliateService';

export class CreateAffiliatesController {
    async handle(req: Request, res: Response) {
        const { title, description, productUrl, buttonName, status = 'true' } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required for affiliate products' });
        }

        const imageUrl = req.file.filename;

        try {
            const serviceData = { 
                title, 
                description, 
                url: productUrl, 
                imageUrl, 
                buttonName, 
                status: status === 'true' || status === true 
            };
            
            const createAffiliateService = new CreateAffiliateService();
            const affiliate = await createAffiliateService.execute(serviceData);
            
            return res.json(affiliate);
        } catch (error) {
            console.log('Erro no controller:', error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}