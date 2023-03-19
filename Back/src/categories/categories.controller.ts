import { Request, Response } from 'express';
import { CategoryService } from './categories.service';

export const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    const { ok, categories, error } = await CategoryService.getAll();
    res.status(ok ? 200 : 404).json(ok ? categories : error);
  },
  create: async (req: Request, res: Response) => {
    const { body } = req;
    const { ok, error } = await CategoryService.create(body);
    res.status(ok ? 201 : 403).json({ ok, error });
  },
  getById: async (req: Request, res: Response) => {
    const { ok, category, error } = await CategoryService.getById(req.params.id);
    res.status(ok ? 200 : 404).json(ok ? category : error);
  },
};
