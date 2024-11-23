import { PrismaClient } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';

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
}

export default new UserService();
