import userController from '@controllers/userController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.get(
  '/top-commenters',
  userController.getUsersWithMostComments.bind(userController),
);
router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getOne.bind(userController));
router.post('/', authMiddleware, userController.create.bind(userController));
router.put('/:id', authMiddleware, userController.update.bind(userController));
router.delete(
  '/:id',
  authMiddleware,
  userController.delete.bind(userController),
);

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router;
