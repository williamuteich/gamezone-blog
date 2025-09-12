import prisma from "../../prisma";
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export interface PutUserRequest {
    id: string;
    [key: string]: any; 
}

export class PutUserService {
    readonly SALT_ROUNDS = 12;

    async hashPassword(password: string) {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    async execute({ id, password, ...rest }: PutUserRequest) {
        if (!id) {
            throw new Error("ID is required");
        }

        // Verificar se o usuário existe
        const existingUser = await prisma.user.findUnique({
            where: { id },
            select: { avatar: true, email: true }
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        // Verificar se o email mudou e se já existe em outro usuário
        if (rest.email && rest.email !== existingUser.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email: rest.email }
            });

            if (emailExists) {
                throw new Error("Este email já está sendo usado por outro usuário");
            }
        }

        const data = Object.fromEntries(
            Object.entries(rest).filter(([_, value]) => value !== undefined && value !== 'undefined')
        );

        if (password && password.trim() !== '') {
            data.password = await this.hashPassword(password);
        }

        if (data.role) {
            const isAdmin = data.role === 'admin' || data.role === 'editor';
            data.isAdmin = isAdmin;
        }

        // Gerenciar avatar - se um novo avatar foi enviado, deletar o antigo
        if (data.avatar && existingUser.avatar && data.avatar !== existingUser.avatar) {
            const oldAvatarPath = path.join('./tmp/users', existingUser.avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        const user = await prisma.user.update({
            where: { id },
            data
        });

        return { message: "User successfully updated" };
    }
}
