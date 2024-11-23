import userController from '@controllers/userController';
import { Router } from 'express';

const router = Router();

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getOne.bind(userController));
router.post('/', userController.create.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export default router;
