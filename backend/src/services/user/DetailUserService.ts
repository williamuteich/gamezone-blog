import prisma from '../../prisma';

export interface DetailUserRequest {
  id: string;
}

export class DetailUserService {
  async execute({ id }: DetailUserRequest) {
    
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      updatedAt: true,
    }
  });

    return user;
  }
}
