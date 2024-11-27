import { PrismaClient, Comment as PrismaComment } from '@prisma/client';
import { BaseServiceImpl } from './baseServiceImpl';

class CommentService extends BaseServiceImpl<PrismaComment> {
  constructor() {
    super(new PrismaClient(), new PrismaClient().comment);
  }

  async createComment(data: Partial<PrismaComment>): Promise<PrismaComment> {
    const newComment = await this.model.create({
      data,
    });
    return newComment;
  }

  async updateComment(
    id: number,
    data: Partial<PrismaComment>,
  ): Promise<PrismaComment | null> {
    const updatedComment = await this.model.update({
      where: { id },
      data,
    });
    return updatedComment;
  }

  async deleteComment(id: number): Promise<PrismaComment | null> {
    const deletedComment = await this.model.delete({
      where: { id },
    });
    return deletedComment;
  }
}

export default new CommentService();
