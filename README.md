🧱 Arkan - Microframework para APIs REST em TypeScript

Arkan é um microframework backend voltado para desenvolvimento de APIs com foco em segurança, modularidade e produtividade. Ele fornece:

🚀 Setup inicial automatizado via CLI (arkan init)
🔐 Autenticação e autorização com RBAC (Role-Based Access Control)
⚙️ Banco de dados configurável (SQLite, PostgreSQL, MySQL...)
🧩 Arquitetura modular com Prisma, Express e testes
📦 Publicado no NPM e disponível via GitHub

🔒 Exclusivamente Backend
Este projeto é somente backend. Não há camada visual (HTML, React, etc.) incluída. O Arkan funciona como uma API RESTful pronta para integração com qualquer frontend ou aplicação móvel.

📦 Instalação
🔸 Via NPM

npm install -g arkan
🔹 Via GitHub

git clone https://github.com/seu-usuario/arkan.git
cd arkan
npm install
⚙️ Setup rápido
Configure tudo com um único comando:

bash
arkan init
Este comando executa:
Geração do Prisma Client
Criação de tabelas via migration
Execução do seed com dados iniciais (usuários, papéis, permissões)
Validação do banco de dados

API pronta para testes locais em http://localhost:3000

🧩 Estrutura gerada
bash
arkan/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ config/
│  ├─ controllers/
│  ├─ routes/
│  ├─ types/
│  └─ server.ts
├─ bin/
│  └─ cli.ts
├─ .env
├─ package.json
🔐 Seed inicial (RBAC)
Usuário	Role	Permissões
admin@api.com	admin	acesso total
dev1@api.com	viewer	ver painel
dev2@api.com	editor	criar/excluir publicações
qa@api.com	viewer	ver painel
📜 Comandos disponíveis
Comando	Descrição
arkan init	Executa o setup completo do projeto
npm run dev	Inicia a API em modo de desenvolvimento
npm run setup	Setup manual: migrate + seed
npx prisma db seed	Executa seed manualmente
🧙‍♂️ Escolha de banco de dados
Por padrão: SQLite Para usar outro banco:

bash
arkan init --db=postgresql
arkan init --db=mysql
O CLI ajusta .env e schema.prisma automaticamente.

🤝 Contribuição
Quer sugerir melhorias, abrir PRs ou criar plugins para o Arkan?


git clone https://github.com/seu-usuario/arkan.git
📖 Licença
MIT © Iberno