import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  const { ok, user } = await UsersService.getByEmail(email);

  if (!ok) {
    res.status(203).send({ ok, error: 'Usuario no encontrado' });
    return;
  }
  const matchPassword = await bcrypt.compare(password, user?.password || '');
  if (!matchPassword) {
    res.status(203).send({ ok: false, error: 'Password inválido' });
    return;
  }
  req.user = {
    userId: user!.id,
    email: user!.email,
  };

  next();
};
