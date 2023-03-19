import { Router } from 'express';
import { ProductsController } from './products.controller';

const router = Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.post('/create', ProductsController.create);

export default router;
