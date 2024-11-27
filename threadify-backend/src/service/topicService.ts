import { PrismaClient, Topic as PrismaTopic } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';

class TopicService extends BaseServiceImpl<PrismaTopic> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().topic);
  }

  async createTopic(data: Partial<PrismaTopic>): Promise<PrismaTopic> {
    const newTopic = await this.model.create({
      data,
    });
    return newTopic;
  }

  async updateTopic(
    id: number,
    data: Partial<PrismaTopic>,
  ): Promise<PrismaTopic | null> {
    const updatedTopic = await this.model.update({
      where: { id },
      data,
    });
    return updatedTopic;
  }

  async deleteTopic(id: number): Promise<PrismaTopic | null> {
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
  async getHotTopics(): Promise<PrismaTopic[]> {
    const topics = await this.model.findMany({
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: 5,
    });
    return topics;
  }
  async getTopicWithComments(id: number): Promise<PrismaTopic | null> {
    const topic = await this.model.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            _count: {
              select: { likes: true },
            },
          },
          orderBy: {
            likes: {
              _count: 'desc',
            },
          },
        },
      },
    });
    return topic;
  }
}

export default new TopicService();
