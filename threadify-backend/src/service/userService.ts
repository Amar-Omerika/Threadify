import { PrismaClient } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

class UserService extends BaseServiceImpl<User> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().user);
  }

  async register(data: Partial<User>): Promise<User> {
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
      expiresIn: '1h',
    });

    return token;
  }
}

export default new UserService();
