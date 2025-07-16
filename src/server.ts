// src/server.ts
import express from 'express';
import { ENV } from './config/env';
import { testDbConnection } from './config/db';
import cors from 'cors';
import helmet from 'helmet';
import appRoutes from './routes';

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rotas principais
app.use('/api', appRoutes);

// Conexão com banco e start do servidor
async function startServer() {
  await testDbConnection();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Servidor Arkan rodando em http://localhost:${ENV.PORT}`);
    console.log(`🌐 Ambiente: ${ENV.NODE_ENV}`);
  });
}

startServer();
