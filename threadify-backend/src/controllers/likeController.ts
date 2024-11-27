import { Request, Response } from 'express';
import LikeService from '@services/likeService';

class LikeController {
  async likeTopic(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { topicId } = req.body;
      const like = await LikeService.likeTopic(userId, topicId);
      res.status(201).json(like);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async dislikeTopic(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { topicId } = req.body;
      const like = await LikeService.dislikeTopic(userId, topicId);
      res.status(200).json(like);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async likeComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { commentId } = req.body;
      const like = await LikeService.likeComment(userId, commentId);
      res.status(201).json(like);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async dislikeComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { commentId } = req.body;
      const like = await LikeService.dislikeComment(userId, commentId);
      res.status(200).json(like);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new LikeController();
