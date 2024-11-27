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

  async getTopics(
    page: number,
    pageSize: number,
    userId: number,
  ): Promise<any[]> {
    const skip = (page - 1) * pageSize;
    const topics = await this.model.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: true,
      },
    });

    // Check if the user has liked each topic
    const topicsWithUserLikeStatus = topics.map((topic: any) => ({
      ...topic,
      isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
    }));

    return topicsWithUserLikeStatus;
  }
  async getHotTopics(userId: number): Promise<any[]> {
    const topics = await this.model.findMany({
      include: {
        _count: {
          select: { likes: true },
        },
        likes: true,
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    const topicsWithUserLikeStatus = topics.map((topic: any) => ({
      ...topic,
      isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
    }));

    return topicsWithUserLikeStatus;
  }

  async getTopicWithComments(id: number, userId: number): Promise<any | null> {
    const topic = await this.model.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            _count: {
              select: { likes: true },
            },
            likes: true,
          },
          orderBy: {
            likes: {
              _count: 'desc',
            },
          },
        },
        likes: true,
      },
    });

    if (topic) {
      return {
        ...topic,
        isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
        comments: topic.comments.map((comment: any) => ({
          ...comment,
          isLikedByUser: comment.likes.some(
            (like: any) => like.userId === userId,
          ),
        })),
      };
    }

    return topic;
  }
}

export default new TopicService();
