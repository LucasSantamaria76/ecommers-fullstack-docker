import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';
import { TCategory } from '../types/product';

export const CategoryService = {
  getAll: async () => {
    try {
      const categories = await prisma.categoryProduct.findMany();

      return { ok: true, categories };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar las categorias',
      };
    }
  },
  create: async (data: TCategory) => {
    try {
      await prisma.categoryProduct.create({
        data: { ...data },
      });

      return { ok: true };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al crear la categoria',
      };
    }
  },
  getById: async (id: string) => {
    try {
      const category = await prisma.categoryProduct.findUniqueOrThrow({
        where: { id },
      });
      return { ok: true, category };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar la categoria',
      };
    }
  },
};
