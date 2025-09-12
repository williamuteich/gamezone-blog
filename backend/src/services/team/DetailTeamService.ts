import prisma from '../../prisma';

export class DetailTeamService {
    async execute(id: string) {
        if (!id) {
            throw new Error('Team ID is required');
        }

        const team = await prisma.team.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!team) {
            throw new Error('Team not found');
        }

        return team;
    }
}