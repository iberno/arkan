// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = Router();

// Listar todos os usuários
router.get('/', getAllUsers);

// Buscar usuário por ID
router.get('/:id', getUserById);

// Criar novo usuário
router.post('/', createUser);

// Atualizar usuário
router.put('/:id', updateUser);

// Remover usuário
router.delete('/:id', deleteUser);

export default router;
