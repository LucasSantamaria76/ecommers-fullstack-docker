import { server } from './server';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

export const prisma = new PrismaClient();

const App = async () => {
  try {
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
};

App();
