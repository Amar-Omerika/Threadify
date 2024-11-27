import likeController from '@controllers/likeController';
import { Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.post(
  '/like-topic',
  authMiddleware,
  likeController.likeTopic.bind(likeController),
);
router.post(
  '/dislike-topic',
  authMiddleware,
  likeController.dislikeTopic.bind(likeController),
);
router.post(
  '/like-comment',
  authMiddleware,
  likeController.likeComment.bind(likeController),
);
router.post(
  '/dislike-comment',
  authMiddleware,
  likeController.dislikeComment.bind(likeController),
);

export default router;
