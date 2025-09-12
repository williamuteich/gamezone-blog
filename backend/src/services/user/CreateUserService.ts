import bcrypt from 'bcrypt';
import prisma from '../../prisma';

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  status?: boolean;
  avatar?: string;
}

export class CreateUserService {
  readonly SALT_ROUNDS = 12;

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async execute(data: UserRequest) {
    if (!data.email || !data.name || !data.password) {
      throw new Error('All fields are required');
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.hashPassword(data.password);

    const user = await prisma.user.create({
      data: { 
        ...data, 
        password: passwordHash
      },
    });

    if (!user) {
      throw new Error('User creation failed');
    }


    return { message: 'User successfully created' };
  }
}
