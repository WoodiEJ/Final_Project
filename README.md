# Weeding Pass
Sistema de gerenciamento de convidados para casamentos.

### Tecnologias

*Frontend*
- Next.js + React
- TypeScript
- TailwindCss
- shadcn/ui
- TanStack Table
- React Hook Form + Zod

*Backend*
- Express.js
- Prisma + MySql
- JWT
- bcrypt

### Como Rodar?

## Pré Requisitos
- Node.js 18+
- MariaDB rodando (xampp, laragon, etc...)
- Banco de dados para conectar com o back.

## Backend
cd backend
npm install
npx prismta migrate dev
npx prisma generate
npm run dev

### Frontend
cd frontend
npm install
npm run dev

### Variaveis de ambiente

## Backend (.env)
crie o arquivo ".env" na raiz do backend
Cole e mude essas informações conforme seu banco e sua preferencia:
-------------------------------------------------------------
DATABASE_URL="mysql://username:password@localhost:3306/mydb"
DATABASE_USER="username"
DATABASE_PASSWORD="password"
DATABASE_NAME="mydb"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

JWT_SECRET="sua-chave-secreta"
------------------------------------------------------------

### Seeding
Para popular o banco apenas digite "npm run seed"

### Funcionalidades
- Autenticação
- Gerenciamento de usuários --> Admin
- Gerenciamento de convidados
- Check In Rápido e intuitivo
- DashBoard com grafícos e cards com dados
- Controle de acesso
