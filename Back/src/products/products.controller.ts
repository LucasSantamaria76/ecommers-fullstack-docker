import { Request, Response } from 'express';
import { ProductsService } from './products.service';

export const ProductsController = {
  getAll: async (req: Request, res: Response) => {
    const { ok, products, error } = await ProductsService.getAll();
    res.status(ok ? 200 : 404).json({ ok, products, error });
  },
  create: async (req: Request, res: Response) => {
    const { features, photos, ...restData } = req.body;
    const { ok, error } = await ProductsService.create(features, photos, restData);
    res.status(ok ? 201 : 403).json({ ok, error });
  },
  getById: async (req: Request, res: Response) => {
    const { ok, product, error } = await ProductsService.getById(req.params.id);
    res.status(ok ? 200 : 404).json(ok ? product : error);
  },
};
