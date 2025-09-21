# 🛒 Mini E-commerce — Desafio Técnico

Este projeto implementa um **mini e-commerce** com backend em **Node.js/Express/Sequelize** e frontend em **React + Vite + TypeScript**.  
Foi desenvolvido em etapas, seguindo boas práticas de commits, validação e arquitetura.

---

## 📂 Estrutura

```
/backend   → API (Node/Express/Sequelize/SQLite)
/frontend  → SPA (React/Vite/TS)
```

---

# 🚀 Backend

### ⚙️ Requisitos

- Node.js LTS (≥ 22.x recomendado)
- npm ou yarn
- SQLite (não precisa instalar cliente; usa arquivo `.sqlite`)

### 🔧 Configuração

1. Acesse a pasta:
   ```bash
   cd backend
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente em `.env.example` e renomeie para `.env`:

   ```env
   PORT=4000
   JWT_SECRET=seuSegredoAqui
   CORS_ORIGIN=http://localhost:5173

   # AWS S3
   AWS_ACCESS_KEY_ID=SUACHAVE
   AWS_SECRET_ACCESS_KEY=SUASECRET
   AWS_REGION=sua-regiao (us-east-1 || us-east-2)
   S3_BUCKET=nome-do-bucket
   S3_PUBLIC_BASE=https://nome-do-bucket.s3.amazonaws.com
   ```

4. Execute as migrations + seeders:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```
   API rodará em: [http://localhost:4000/api](http://localhost:4000/api)

---

### 📌 Endpoints obrigatórios

#### Auth

- `POST /api/auth/register` → cria usuário (`name`, `email`, `password`)
- `POST /api/auth/login` → autentica, retorna JWT

#### Products

- `GET /api/products?page=1&limit=12` → lista produtos (pagina)
- `GET /api/products/search?q=termo` → busca por código ou nome

#### Cart (JWT necessário)

- `GET /api/cart` → lista itens do carrinho do usuário
- `POST /api/cart` → adiciona produto  
  body: `{ "product_id": 1, "quantity": 2 }`
- `PUT /api/cart/:id` → atualiza quantidade
- `DELETE /api/cart/:id` → remove item

#### AWS

- `POST /api/products/:id/image/sign` → gera URL pré-assinada de upload
- `PATCH /api/products/:id/image` → salva `image_url` no produto
- (opcional privado) `GET /api/products/image/sign-view?key=...` → gera URL pré-assinada de leitura

---

### 🔒 Requisitos técnicos atendidos

- Middleware JWT
- Validação (`express-validator`)
- Senhas criptografadas (`bcrypt`)
- Tratamento de erros centralizado
- Respostas JSON padronizadas `{ ok:true, data } | { ok:false, error }`
- CORS configurado via `.env`

---

# 💻 Frontend

### ⚙️ Requisitos

- Node.js LTS (≥ 22.x recomendado)
- npm ou yarn

### 🔧 Configuração

1. Acesse a pasta:
   ```bash
   cd frontend
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente em `.env.example` e renomeie para `.env`:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
4. Inicie:
   ```bash
   npm run dev
   ```
   App rodará em: [http://localhost:5173](http://localhost:5173)

---

### 📌 Funcionalidades do frontend

- **Login / Registro**

  - Formulários validados (`required`, `minLength`, `email`)
  - JWT armazenado em `localStorage`
  - Logout automático em 401

- **Produtos**
  - Listagem paginada
  - Busca por código/nome
  - Upload de imagem para S3
- **Carrinho**
  - Adicionar item
  - Listar itens
  - Atualizar quantidade
  - Remover item
  - Total exibido

---

# ☁️ AWS S3

### Passos

1. Criar bucket no S3 (`us-east-1` ou `us-east-2`).
2. Configurar **CORS** do bucket:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT"],
       "AllowedOrigins": ["http://localhost:5173"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```
3. Ajustar **Bucket Policy** se quiser leitura pública:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::NOME-DO-BUCKET/*"
       }
     ]
   }
   ```
4. No frontend, ao enviar imagem:
   - Chama `POST /api/products/:id/image/sign` para pegar `uploadUrl` + `fileUrl`.
   - Faz `PUT` direto no S3 com o arquivo.
   - Chama `PATCH /api/products/:id/image` para salvar `image_url` no produto.

---

# 🧪 Testes rápidos

### Usuário

```bash
curl -X POST http://localhost:4000/api/auth/register  -H "Content-Type: application/json"  -d '{"name":"Ana","email":"ana@ex.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login  -H "Content-Type: application/json"  -d '{"email":"ana@ex.com","password":"123456"}'
```

### Produtos

```bash
curl http://localhost:4000/api/products
```

### Carrinho

```bash
curl -X POST http://localhost:4000/api/cart  -H "Authorization: Bearer TOKEN"  -H "Content-Type: application/json"  -d '{"product_id":1,"quantity":2}'
```

---

# ✅ Checklist

- [x] Endpoints obrigatórios
- [x] JWT auth + middleware
- [x] Validação básica
- [x] Senhas com bcrypt
- [x] Erros tratados
- [x] JSON padronizado
- [x] CORS configurado
- [x] Fluxo usuário (login → produtos → carrinho)
- [x] Commits organizados por etapa
- [x] Upload para AWS S3

---

👨‍💻 Desenvolvido por **Ricardo Silva**
