import commentController from '@controllers/commentController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  commentController.create.bind(commentController),
);
router.put(
  '/:id',
  authMiddleware,
  commentController.update.bind(commentController),
);
router.delete(
  '/:id',
  authMiddleware,
  commentController.delete.bind(commentController),
);

export default router;
