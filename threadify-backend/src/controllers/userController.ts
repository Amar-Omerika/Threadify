import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { Request, Response } from 'express';
import { BaseController } from './baseController';
import UserService from '@services/userService';

class UserController extends BaseController<PrismaUser, typeof UserService> {
  constructor() {
    super(UserService);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.service.register(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getUsersWithMostComments(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getUsersWithMostComments();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const user = await this.service.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const updatedUser = await this.service.updateUser(userId, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { newPassword } = req.body;
      const updatedUser = await this.service.changePassword(
        userId,
        newPassword,
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const deletedUser = await this.service.deleteUser(userId);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
