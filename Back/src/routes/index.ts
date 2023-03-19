import { Router } from 'express';
import users from '../users/users.routes';
import products from '../products/products.routes';
import categories from '../categories/categories.routes';

const router = Router();

router.use('/commers/api/users', users);
router.use('/commers/api/categories', categories);
router.use('/commers/api/products', products);

export default router;
