import { prisma } from '..';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '../constants/error';
import { TProfile, TUser } from '../types/users';
import { exclude } from '../utils';

export const UsersService = {
  getAll: async () => {
    try {
      const auxUsers = await prisma.users.findMany({
        include: {
          profile: true,
        },
      });

      const users = auxUsers.map((user) => exclude(user, ['password']));

      return { ok: true, users };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
      };
    }
  },
  create: async ({ email, password, profile }: TUser & TProfile) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          profile: {
            create: { ...(profile as TProfile) },
          },
        },
      });

      return { ok: true };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al registrar el usuario',
      };
    }
  },
  getByEmail: async (email: string) => {
    try {
      const user = await prisma.users.findUniqueOrThrow({
        where: { email },
      });
      return { ok: true, user };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
      };
    }
  },
  getById: async (id: string) => {
    try {
      const user = await prisma.users.findUniqueOrThrow({
        where: { id },
        include: {
          profile: true,
        },
      });
      return { ok: true, user };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
      };
    }
  },
  login: async ({ userId, email }: { userId: string; email: string }) => {
    try {
      const SECRET = process.env.SECRET || '';
      return { ok: true, token: jwt.sign({ userId, email }, SECRET) };
    } catch (error) {
      return { ok: false, error: 'Error al generar el token' };
    }
  },
};
