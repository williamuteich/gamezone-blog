import { Request, Response } from 'express';
import { GetAllAffiliateService } from '../../services/affiliates/GetAllAffiliateService';

export class GetAllAffiliateController {
  async handle(req: Request, res: Response) {
    try {
      const getAllAffiliateService = new GetAllAffiliateService();
      const affiliates = await getAllAffiliateService.execute();

      return res.json(affiliates);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
