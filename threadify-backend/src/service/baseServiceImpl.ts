import { PrismaClient } from '@prisma/client';
import { BaseService } from '@interfaces/Interface';

export class BaseServiceImpl<T> implements BaseService<T> {
  constructor(
    public prisma: PrismaClient,
    private model: any,
  ) {}

  async getAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async getOne(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number): Promise<T | null> {
    return this.model.delete({ where: { id } });
  }
}
