// src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige o __dirname para funcionar com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o arquivo .env da raiz
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Exporta as variáveis que serão usadas no projeto
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET || 'arkan-secret',
};
