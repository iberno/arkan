// src/config/db.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Exemplo de teste de conexão
export async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
    process.exit(1);
  }
}
