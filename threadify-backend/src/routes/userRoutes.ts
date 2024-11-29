import userController from '@controllers/userController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.get('/me', authMiddleware, userController.getUser.bind(userController));
router.put(
  '/me',
  authMiddleware,
  userController.updateUser.bind(userController),
);
router.put(
  '/me/password',
  authMiddleware,
  userController.changePassword.bind(userController),
);
router.delete(
  '/me',
  authMiddleware,
  userController.deleteUser.bind(userController),
);

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
