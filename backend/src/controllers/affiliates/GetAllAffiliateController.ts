import { Request, Response } from 'express';
import { GetAllAffiliateService } from '../../services/affiliates/GetAllAffiliateService';

export class GetAllAffiliateController {
  async handle(req: Request, res: Response) {
    try {
      const { search, page, limit, status } = req.query;

      const getAllAffiliateService = new GetAllAffiliateService();
      const result = await getAllAffiliateService.execute({
        search: search as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
        status: status as string
      });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
