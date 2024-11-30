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
    const avatarUrl = this.generateAvatarUrl(data.email!);
    const newUser = await this.model.create({
      data: {
        ...data,
        password: hashedPassword,
        avatarUrl,
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

  async getUserById(userId: number): Promise<PrismaUser | null> {
    return this.model.findUnique({
      where: { id: userId },
    });
  }

  async updateUser(
    userId: number,
    data: Partial<PrismaUser>,
  ): Promise<PrismaUser | null> {
    return this.model.update({
      where: { id: userId },
      data,
    });
  }

  async changePassword(
    userId: number,
    newPassword: string,
  ): Promise<PrismaUser | null> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.model.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async deleteUser(userId: number): Promise<PrismaUser | null> {
    // Delete associated likes
    await this.prisma.like.deleteMany({ where: { userId } });

    // Delete associated comments
    await this.prisma.comment.deleteMany({ where: { authorId: userId } });

    // Delete associated topics
    await this.prisma.topic.deleteMany({ where: { authorId: userId } });

    // Delete the user
    return this.model.delete({
      where: { id: userId },
    });
  }

  private generateAvatarUrl(email: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random&size=128`;
  }
}

export default new UserService();
