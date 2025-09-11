import prisma from '../../prisma';

export interface DeleteUserRequest {
    id: string;
}

export class DeleteUserService {
    async execute({ id }: DeleteUserRequest) {
        if (!id) {
            throw new Error('User ID is required');
        }

        try {
            const user = await prisma.user.delete({
                where: { id },
            });

            return { message: 'User successfully deleted' };
        } catch (error: any) {
         
            if (error.code === 'P2025') {
                throw new Error('User not found');
            }
            throw error; 
        }
    }
}
