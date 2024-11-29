import { PrismaClient, Topic as PrismaTopic } from '@prisma/client';
import { Request, Response } from 'express';
import { BaseController } from './baseController';
import TopicService from '@services/topicService';

class TopicController extends BaseController<PrismaTopic, typeof TopicService> {
  constructor() {
    super(TopicService);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const authorId = (req as any).userId;
      const newTopic = await this.service.createTopic({
        title,
        description,
        authorId,
      });
      res.status(201).json(newTopic);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedTopic = await this.service.updateTopic(
        Number(req.params.id),
        req.body,
      );
      if (!updatedTopic) {
        res.status(404).json({ message: 'Topic not found' });
      } else {
        res.status(200).json(updatedTopic);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedTopic = await this.service.deleteTopic(
        Number(req.params.id),
      );
      if (!deletedTopic) {
        res.status(404).json({ message: 'Topic not found' });
      } else {
        res.status(200).json({ message: 'Topic deleted' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTopics(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 20;
      const userId = (req as any).userId;
      const topics = await this.service.getTopics(page, pageSize, userId);
      res.status(200).json(topics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getHotTopics(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const topics = await this.service.getHotTopics(userId);
      res.status(200).json(topics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Type assertion to access userId
      const topic = await this.service.getTopicWithComments(
        Number(req.params.id),
        userId,
      );
      if (!topic) {
        res.status(404).json({ message: 'Topic not found' });
      } else {
        res.status(200).json(topic);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TopicController();
