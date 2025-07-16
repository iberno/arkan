import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';

export const getAllUsers = async (_req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await userModel.getUserById(id);
    user ? res.json(user) : res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, senha } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (senha) updates.password = await bcrypt.hash(senha, 10);

    const updatedUser = await userModel.updateUser(id, updates);

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
