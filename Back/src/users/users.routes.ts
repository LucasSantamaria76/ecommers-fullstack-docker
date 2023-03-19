import { Router } from 'express';
import { verifyPassword } from '../middleware/verifyPassword';
import { UsersController } from './users.controller';

const router = Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.post('/register', UsersController.create);
router.post('/login', verifyPassword, UsersController.login);

export default router;
