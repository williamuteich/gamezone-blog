import prisma from '../../prisma';

export class GetAllAffiliateService {
    async execute() {
        const affiliates = await prisma.affiliate.findMany();

        return affiliates;
    }
}