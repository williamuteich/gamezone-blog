import prisma from '../../prisma';
import fs from 'fs';
import path from 'path';

export interface DeleteUserRequest {
    id: string;
}

export class DeleteUserService {
    async execute({ id }: DeleteUserRequest) {
        if (!id) {
            throw new Error('User ID is required');
        }

        try {
            // Primeiro, buscar o usuário para pegar o avatar antes de excluir
            const existingUser = await prisma.user.findUnique({
                where: { id },
                select: { avatar: true }
            });

            if (!existingUser) {
                throw new Error('User not found');
            }

            // Excluir o usuário do banco
            await prisma.user.delete({
                where: { id },
            });

            // Se o usuário tinha avatar, remover o arquivo
            if (existingUser.avatar) {
                const avatarPath = path.join('./tmp/users', existingUser.avatar);
                if (fs.existsSync(avatarPath)) {
                    fs.unlinkSync(avatarPath);
                }
            }

            return { message: 'User successfully deleted' };
        } catch (error: any) {
         
            if (error.code === 'P2025') {
                throw new Error('User not found');
            }
            throw error; 
        }
    }
}
