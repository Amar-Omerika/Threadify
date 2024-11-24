import { Request, Response } from 'express';
import { BaseController } from './baseController';
import UserService from '@services/userService';

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
class UserController extends BaseController<User, typeof UserService> {
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
}

export default new UserController();
