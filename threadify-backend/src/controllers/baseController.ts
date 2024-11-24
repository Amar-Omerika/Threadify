import { BaseService } from '@interfaces/Interface';
import { Request, Response } from 'express';

export class BaseController<T, S extends BaseService<T>> {
  constructor(protected service: S) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.getOne(Number(req.params.id));
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newItem = await this.service.create(req.body);
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem = await this.service.update(
        Number(req.params.id),
        req.body,
      );
      if (!updatedItem) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json(updatedItem);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedItem = await this.service.delete(Number(req.params.id));
      if (!deletedItem) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json({ message: 'Item deleted' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
