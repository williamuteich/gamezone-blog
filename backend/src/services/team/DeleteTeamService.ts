import prisma from '../../prisma';

export class DeleteTeamService {
    async execute(id: string) {
        if (!id) {
            throw new Error("ID is required");
        }

        const teamMember = await prisma.team.findUnique({
            where: { id }
        });

        if (!teamMember) {
            throw new Error("Team member not found");
        }

        await prisma.team.delete({
            where: { id }
        });

        return { message: "Team member successfully deleted" };
    }
}