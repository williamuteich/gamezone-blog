import prisma from "../../prisma";
import bcrypt from 'bcrypt';

export interface PutUserRequest {
    id: string;
    [key: string]: any; // permite campos dinâmicos
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

        const data = Object.fromEntries(
            Object.entries(rest).filter(([_, value]) => value !== undefined)
        );

        // Se uma senha foi fornecida, fazer hash dela
        if (password && password.trim() !== '') {
            data.password = await this.hashPassword(password);
        }

        const user = await prisma.user.update({
            where: { id },
            data
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Remover a senha do retorno
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
