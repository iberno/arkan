import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = (name: string, email: string, passwordHash: string) => {
  return prisma.user.create({
    data: { name, email, password: passwordHash },
  });
};

export const updateUser = (id: number, updates: Partial<{ name: string; email: string; password: string }>) => {
  return prisma.user.update({
    where: { id },
    data: updates,
  });
};

export const deleteUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};
