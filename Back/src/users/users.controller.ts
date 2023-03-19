import { Request, Response } from 'express';
import { UsersService } from './users.service';

export const UsersController = {
  getAll: async (req: Request, res: Response) => {
    const { ok, users, error } = await UsersService.getAll();
    res.status(ok ? 200 : 404).json(ok ? users : error);
  },
  create: async (req: Request, res: Response) => {
    const { body } = req;
    const { ok, error } = await UsersService.create(body);
    res.status(ok ? 201 : 403).json({ ok, error });
  },
  getByEmail: async (req: Request, res: Response) => {
    const { ok, user, error } = await UsersService.getByEmail(req.params.email);
    res.status(ok ? 200 : 404).json(ok ? user : error);
  },
  getById: async (req: Request, res: Response) => {
    const { ok, user, error } = await UsersService.getById(req.params.id);
    res.status(ok ? 200 : 404).json({ ok, user, error });
  },
  login: async (req: Request, res: Response) => {
    const { ok, token } = await UsersService.login(req.user);
    res.status(ok ? 200 : 401).json({ ok, token, id: req.user.userId });
  },
};
