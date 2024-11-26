import topicController from '@controllers/topicController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.get('/hot', topicController.getHotTopics.bind(topicController));
router.get('/', topicController.getTopics.bind(topicController));
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
