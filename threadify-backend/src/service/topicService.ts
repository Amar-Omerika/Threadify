import { PrismaClient, Topic as PrismaTopic } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}

class TopicService extends BaseServiceImpl<Topic> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().topic);
  }

  async createTopic(data: Partial<Topic>): Promise<Topic> {
    const newTopic = await this.model.create({
      data,
    });
    return newTopic;
  }

  async updateTopic(id: number, data: Partial<Topic>): Promise<Topic | null> {
    const updatedTopic = await this.model.update({
      where: { id },
      data,
    });
    return updatedTopic;
  }

  async deleteTopic(id: number): Promise<Topic | null> {
    const deletedTopic = await this.model.delete({
      where: { id },
    });
    return deletedTopic;
  }

  async getTopics(page: number, pageSize: number): Promise<PrismaTopic[]> {
    const skip = (page - 1) * pageSize;
    const topics = await this.model.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return topics;
  }
}

export default new TopicService();
