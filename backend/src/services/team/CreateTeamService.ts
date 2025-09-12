import prisma from '../../prisma';
import bcrypt from 'bcrypt';
import { TeamRole } from '../../generated/prisma';

interface CreateTeamRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: TeamRole | string;
    avatar?: string;
    status?: boolean;
}

export class CreateTeamService {
    async execute(data: CreateTeamRequest) {
        if (!data.email || !data.name || !data.password) {
            throw new Error('All fields are required');
        }

        const teamAlreadyExists = await prisma.team.findUnique({
            where: { email: data.email },
        })

        if (teamAlreadyExists) {
            throw new Error('Team already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        const team = await prisma.team.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: (data.role as TeamRole) || TeamRole.EDITOR,
                avatar: data.avatar,
                status: data.status !== undefined ? data.status : true,
            },
        })

        if (!team) {
            throw new Error('Team creation failed');
        }

        return { message: 'Colaborator successfully created'};
    }
}