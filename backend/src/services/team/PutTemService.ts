import prisma from '../../prisma';
import { hash } from 'bcrypt';
import { TeamRole } from '../../generated/prisma';
import fs from 'fs';
import path from 'path';

interface PutTeamRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    role?: TeamRole | string;
    status?: boolean;
    avatar?: string;
}

export class PutTeamService {
    async execute({ id, name, email, password, role, status, avatar }: PutTeamRequest) {
        if (!id) {
            throw new Error("ID is Required");
        }

        const teamMemberExists = await prisma.team.findUnique({
            where: { id }
        });

        if (!teamMemberExists) {
            throw new Error("Team member not found");
        }

        if (email && email !== teamMemberExists.email) {
            const emailExists = await prisma.team.findUnique({
                where: { email }
            });

            if (emailExists) {
                throw new Error("This email is already in use by another team member");
            }
        }

        const updateData: any = {};
        
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role as TeamRole;
        if (status !== undefined) updateData.status = typeof status === 'string' ? status === 'true' : status;

        // Gerenciar avatar - se um novo avatar foi enviado, deletar o antigo
        if (avatar !== undefined) {
            // Se já tinha um avatar e está sendo substituído, deletar o arquivo antigo
            if (teamMemberExists.avatar && avatar !== teamMemberExists.avatar) {
                const oldAvatarPath = path.join('./tmp/team', teamMemberExists.avatar);
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath);
                }
            }
            updateData.avatar = avatar;
        }

        if (password) {
            updateData.password = await hash(password, 8);
        }

        const teamMember = await prisma.team.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                avatar: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return teamMember;
    }
}