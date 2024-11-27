import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService extends BaseServiceImpl<PrismaUser> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().user);
  }

  async register(data: Partial<PrismaUser>): Promise<PrismaUser> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const newUser = await this.model.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.model.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '5h',
    });

    return token;
  }
  async getUsersWithMostComments(): Promise<PrismaUser[]> {
    const users = await this.prisma.user.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        comments: {
          _count: 'desc',
        },
      },
      take: 10,
    });
    return users;
  }
}

export default new UserService();
