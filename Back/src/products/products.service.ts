import { prisma } from '..';
import { ERROR_CODES } from '../constants/error';
import { TProduct } from '../types/product';

export const ProductsService = {
  getAll: async () => {
    try {
      const products = await prisma.products.findMany({
        include: {
          category: true,
          feature: true,
          photos: {
            select: {
              id: true,
              photo: true,
            },
          },
        },
      });

      return { ok: true, products };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar los productos',
      };
    }
  },

  create: async (features: string[], photos: string[], data: TProduct) => {
    try {
      const product = await prisma.products.create({
        data: {
          ...data,
        },
      });

      photos?.forEach(async (photo: string) => {
        await prisma.imagesProduct.create({
          //@ts-ignore
          data: {
            photo,
            product: {
              //@ts-ignore
              connect: { id: product.id },
            },
          },
        });
      });

      features?.forEach(async (feature: string) => {
        await prisma.productFeature.create({
          //@ts-ignore
          data: {
            feature,
            product: {
              //@ts-ignore
              connect: { id: product.id },
            },
          },
        });
      });

      return { ok: true };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al crear el producto',
      };
    }
  },
  getById: async (id: string) => {
    try {
      const product = await prisma.products.findUniqueOrThrow({
        where: { id },
        include: {
          category: true,
          feature: true,
          photos: {
            select: {
              id: true,
              photo: true,
            },
          },
        },
      });
      return { ok: true, product };
    } catch (error: any) {
      return {
        ok: false,
        error: ERROR_CODES[error.code] || 'Hubo un error al recuperar el producto',
      };
    }
  },
};
