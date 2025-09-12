import prisma from '../../prisma';
import fs from 'fs';
import path from 'path';

export class DeleteAffiliateService {
    async execute(id: string) {
        if(!id) {
            throw new Error('ID is required');
        }

        // Primeiro, buscar o afiliado para pegar a imagem antes de excluir
        const existingAffiliate = await prisma.affiliate.findUnique({
            where: { id },
            select: { imageUrl: true }
        });

        if(!existingAffiliate) {
            throw new Error('Affiliate not found');
        }

        // Excluir o afiliado do banco
        await prisma.affiliate.delete({
            where: { id }
        });

        // Se o afiliado tinha imagem, remover o arquivo
        if (existingAffiliate.imageUrl) {
            const imagePath = path.join('./tmp/affiliates', existingAffiliate.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return { message: 'Affiliate successfully deleted' };
    }
}