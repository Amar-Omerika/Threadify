import { Request, Response } from 'express';
import CommentService from '@services/commentService';

class CommentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { content, topicId } = req.body;
      const authorId = (req as any).userId; // Type assertion to access userId
      const newComment = await CommentService.createComment({
        content,
        topicId,
        authorId,
      });
      res.status(201).json(newComment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedComment = await CommentService.updateComment(
        Number(req.params.id),
        req.body,
      );
      if (!updatedComment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.status(200).json(updatedComment);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedComment = await CommentService.deleteComment(
        Number(req.params.id),
      );
      if (!deletedComment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.status(200).json({ message: 'Comment deleted' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CommentController();
