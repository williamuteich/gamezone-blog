import prisma from '../../prisma';

interface AffiliateData {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    buttonName: string;
    status: boolean;
}

export class CreateAffiliateService {
    async execute(data: AffiliateData) {
        console.log('Service recebeu dados:', data);
        
        if (!data.title || !data.description || !data.url || !data.buttonName) {
            throw new Error('All fields are required');
        }

        const prismaData = {
            title: data.title,
            description: data.description,
            link: data.url,
            imageUrl: data.imageUrl,
            buttonName: data.buttonName,
            status: data.status,
        };
        
        const affiliate = await prisma.affiliate.create({
            data: prismaData
        })

        if(!affiliate) {
            throw new Error('Affiliate creation failed');
        }

        return { message: 'Affiliate created successfully' };
    }
}