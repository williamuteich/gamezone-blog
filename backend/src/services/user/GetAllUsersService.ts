import prisma from '../../prisma';

export class GetAllUsersService {
  async execute() {
    const users = await prisma.user.findMany();
    return users.map(({ password, ...user }) => user);
  }
}
