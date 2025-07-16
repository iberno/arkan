// src/controllers/userController.ts
import { Controller } from '../types/controller';

export const getAllUsers: Controller = async (req, res) => {
  return res.json({ message: 'Listagem de usuários funcionando 🎉' });
};
