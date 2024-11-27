import { PrismaClient } from '@prisma/client';

export interface BaseService<T> {
  prisma: PrismaClient;
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<T | null>;
}
export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}
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
