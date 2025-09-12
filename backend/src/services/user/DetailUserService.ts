import prisma from '../../prisma';

export interface DetailUserRequest {
  id: string;
}

export class DetailUserService {
  async execute({ id }: DetailUserRequest) {

    if (!id) {
      throw new Error('User ID is required');
    }
    
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    }
  });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
