import prisma from "../../prisma";
import bcrypt from 'bcrypt';

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

        const data = Object.fromEntries(
            Object.entries(rest).filter(([_, value]) => value !== undefined)
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


        return { message: "User successfully updated" };
    }
}
