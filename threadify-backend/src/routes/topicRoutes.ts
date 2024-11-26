import topicController from '@controllers/topicController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.get('/', topicController.getAll.bind(topicController));
router.get('/:id', topicController.getOne.bind(topicController));
router.post('/', authMiddleware, topicController.create.bind(topicController));
router.put(
  '/:id',
  authMiddleware,
  topicController.update.bind(topicController),
);
router.delete(
  '/:id',
  authMiddleware,
  topicController.delete.bind(topicController),
);

export default router;
