import prisma from '../../prisma';

export class DeleteAffiliateService {
    async execute(id: string) {
        if(!id) {
            throw new Error('ID is required');
        }

        const affiliate = await prisma.affiliate.delete({
            where: { id }
        })

        if(!affiliate) {
            throw new Error('Affiliate not found');
        }

        return { message: 'Affiliate successfully deleted' };
    }
}