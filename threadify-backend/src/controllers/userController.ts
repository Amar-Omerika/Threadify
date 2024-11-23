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
}

export default new UserController();
