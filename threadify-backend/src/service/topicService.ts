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
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        likes: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    // Check if the user has liked each topic and if the user posted the topic
    const topicsWithUserLikeStatus = topics.map((topic: any) => ({
      ...topic,
      isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
      isAuthoredByUser: topic.authorId === userId,
      numberOfComments: topic._count.comments,
      authorName: `${topic.author.firstName} ${topic.author.lastName}`,
    }));

    return topicsWithUserLikeStatus;
  }

  async getHotTopics(userId: number): Promise<any[]> {
    const topics = await this.model.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: { likes: true, comments: true },
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

    // Check if the user has liked each topic and if the user posted the topic
    const topicsWithUserLikeStatus = topics.map((topic: any) => ({
      ...topic,
      isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
      isAuthoredByUser: topic.authorId === userId,
      numberOfComments: topic._count.comments,
      authorName: `${topic.author.firstName} ${topic.author.lastName}`,
    }));

    return topicsWithUserLikeStatus;
  }

  async getTopicWithComments(id: number, userId: number): Promise<any | null> {
    const topic = await this.model.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
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
        authorName: `${topic.author.firstName} ${topic.author.lastName}`,
        comments: topic.comments.map((comment: any) => ({
          ...comment,
          isLikedByUser: comment.likes.some(
            (like: any) => like.userId === userId,
          ),
          isAuthoredByUser: comment.authorId === userId,
          authorName: `${comment.author.firstName} ${comment.author.lastName}`,
        })),
      };
    }

    return topic;
  }
  async getUserTopics(userId: number): Promise<any[]> {
    const topics = await this.model.findMany({
      where: { authorId: userId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        likes: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    // Check if the user has liked each topic
    const topicsWithUserLikeStatus = topics.map((topic: any) => ({
      ...topic,
      isLikedByUser: topic.likes.some((like: any) => like.userId === userId),
      isAuthoredByUser: topic.authorId === userId,
      numberOfComments: topic._count.comments,
      authorName: `${topic.author.firstName} ${topic.author.lastName}`,
    }));

    return topicsWithUserLikeStatus;
  }
}

export default new TopicService();
