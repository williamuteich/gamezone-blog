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

        // Se há novo avatar, buscar o avatar antigo para removê-lo
        let oldAvatar: string | null = null;
        if (rest.avatar && rest.avatar !== 'undefined') {
            const existingUser = await prisma.user.findUnique({
                where: { id },
                select: { avatar: true }
            });
            oldAvatar = existingUser?.avatar || null;
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

        const user = await prisma.user.update({
            where: { id },
            data
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Remover avatar antigo se um novo foi enviado
        if (oldAvatar && data.avatar && oldAvatar !== data.avatar) {
            const oldAvatarPath = path.join('./tmp/users', oldAvatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        return { message: "User successfully updated" };
    }
}
