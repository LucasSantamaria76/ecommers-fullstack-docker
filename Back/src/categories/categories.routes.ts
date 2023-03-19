import { Router } from 'express';
import { CategoryController } from './categories.controller';

const router = Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/create', CategoryController.create);

export default router;
