import prisma from '../../prisma';

interface GetAllAffiliateParams {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
}

export class GetAllAffiliateService {
    async execute({ search, page = 1, limit = 10, status }: GetAllAffiliateParams = {}) {
        const skip = (page - 1) * limit;
        
        // Construir filtros
        const where: any = {};
        
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { buttonName: { contains: search, mode: 'insensitive' } }
            ];
        }
        
        if (status !== undefined && status !== '') {
            where.status = status === 'true';
        }

        // Buscar afiliados com paginação
        const [affiliates, totalCount] = await Promise.all([
            prisma.affiliate.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.affiliate.count({ where })
        ]);

        // Calcular estatísticas
        const [totalAffiliates, activeCount, inactiveCount] = await Promise.all([
            prisma.affiliate.count(),
            prisma.affiliate.count({ where: { status: true } }),
            prisma.affiliate.count({ where: { status: false } })
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            affiliates,
            pagination: {
                currentPage: page,
                totalPages,
                totalAffiliates: totalCount,
                limit,
                hasNext: page < totalPages,
                hasPrevious: page > 1
            },
            stats: {
                totalAfiliados: totalAffiliates,
                activeAfiliados: activeCount,
                inactiveAfiliados: inactiveCount
            }
        };
    }
}