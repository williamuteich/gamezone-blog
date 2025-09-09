import prisma from "../../prisma";

export interface PutUserRequest {
    id: string;
    [key: string]: any; // permite campos dinâmicos
}

export class PutUserService {
    async execute({ id, ...rest }: PutUserRequest) {
        if (!id) {
            throw new Error("ID is required");
        }

        const data = Object.fromEntries(
            Object.entries(rest).filter(([_, value]) => value !== undefined)
        );

        const user = await prisma.user.update({
            where: { id },
            data
        });

        return user;
    }
}
