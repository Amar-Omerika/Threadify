import { PrismaClient, Like as PrismaLike } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';

class LikeService extends BaseServiceImpl<PrismaLike> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().like);
  }

  async likeTopic(userId: number, topicId: number): Promise<PrismaLike> {
    const like = await this.model.create({
      data: {
        userId,
        topicId,
      },
    });
    return like;
  }

  async dislikeTopic(
    userId: number,
    topicId: number,
  ): Promise<PrismaLike | null> {
    const like = await this.model.delete({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
    });
    return like;
  }

  async likeComment(userId: number, commentId: number): Promise<PrismaLike> {
    const like = await this.model.create({
      data: {
        userId,
        commentId,
      },
    });
    return like;
  }

  async dislikeComment(
    userId: number,
    commentId: number,
  ): Promise<PrismaLike | null> {
    const like = await this.model.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
    return like;
  }
}

export default new LikeService();
