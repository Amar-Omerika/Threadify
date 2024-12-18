import topicController from '@controllers/topicController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.get(
  '/hot',
  authMiddleware,
  topicController.getHotTopics.bind(topicController),
);
router.get(
  '/',
  authMiddleware,
  topicController.getTopics.bind(topicController),
);
router.get(
  '/:id',
  authMiddleware,
  topicController.getOne.bind(topicController),
);
router.get(
  '/user/topics',
  authMiddleware,
  topicController.getUserTopics.bind(topicController),
);
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
