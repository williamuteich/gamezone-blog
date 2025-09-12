import prisma from '../../prisma';
import fs from 'fs';
import path from 'path';

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

        // Deletar o avatar se existir
        if (teamMember.avatar) {
            const avatarPath = path.join('./tmp/team', teamMember.avatar);
            if (fs.existsSync(avatarPath)) {
                fs.unlinkSync(avatarPath);
            }
        }

        await prisma.team.delete({
            where: { id }
        });

        return { message: "Team member successfully deleted" };
    }
}