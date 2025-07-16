import fs from 'fs';

const dbExists = fs.existsSync('prisma/dev.db');
if (dbExists) {
  console.log('🧾 Banco já existe. Gerando dump...');
  // Executa dump
  // pula createTables
} else {
  console.log('📄 Banco não encontrado. Criando via SQL...');
  // Executa createTables.sql
}

console.log('🌱 Executando seed...');
