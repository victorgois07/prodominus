# Prodominus

**Product + Dominus** = domínio total sobre a gestão de produtos.

Sistema moderno de gerenciamento de produtos com Next.js 15, utilizando DDD, Clean Architecture, Atomic Design, TSyringe e boas práticas modernas de desenvolvimento.

---

## 📝 Descrição do Desafio

Aplicação web para gerenciamento de produtos, com foco em:

- **Next.js** + **TypeScript**
- **Tailwind CSS**
- **Gerenciamento de estado global**
- **Consumo de API mockada**
- **Testes automatizados**
- **Boas práticas de arquitetura e código**

---

## 🚀 Funcionalidades Implementadas

### Funcionalidades obrigatórias

- [x] **Listar produtos** (nome, categoria, preço, descrição, imagem)
- [x] **Cadastro de produtos** (nome, preço, descrição, categoria, imagem)
- [x] **Editar produtos**
- [x] **Deletar produtos**
- [x] **Filtro por nome e faixa de preço**
- [x] **Ordenação dos resultados**

### Extras (diferenciais)

- [x] **Paginação**
- [x] **Layout responsivo**
- [x] **Documentação clara e completa**
- [x] **Teste de snapshot de tela**

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**
- **Zustand** (estado global)
- **React Hook Form** + **Zod** (validação de formulários)
- **TSyringe** (injeção de dependência)
- **Vitest** (testes unitários, integrados e snapshots)
- **JSONPlaceholder** (mock de CRUD local)
- **Fake Store API** (seed de dados reais de produtos)
- **Atomic Design** (atoms, molecules, organisms)

---

## 📦 Estrutura de Pastas

```
/
├── src/
│   ├── app/                # Interface e rotas (Next.js App Router)
│   │   └── components/
│   │       ├── atoms/
│   │       ├── molecules/
│   │       ├── organisms/
│   │       └── index.ts
│   ├── business/
│   │   ├── controllers/
│   │   ├── hooks/
│   │   ├── models/         # Schemas com Zod
│   │   ├── dtos/
│   │   └── store/
│   ├── domain/
│   │   └── entities/
│   ├── infra/
│   │   ├── repositories/
│   │   └── container/      # Inversão de dependência com TSyringe
│   └── services/           # Use-cases
├── __tests__/              # Testes unitários, integrados e snapshots
├── public/                 # Assets públicos (favicon, etc)
├── db.json                 # Mock de dados local
```

---

## 🧩 Atomic Design

- **Atoms:** Botões, Inputs, Labels, Modal, Toast
- **Molecules:** FormField, Filtro, Sort
- **Organisms:** ProductForm, ProductGrid, ProductCard

---

## 🛒 APIs Utilizadas

- **Fake Store API**: <https://fakestoreapi.com> (seed de dados)
- **JSON Server**: <http://localhost:3001> (mock backend local)

---

## ⚙️ Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd prodominus
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install # ou npm install ou yarn install
   ```
3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   # Edite se necessário
   ```
4. **Inicie o mock da API (JSON Server):**
   ```bash
   npx json-server --watch db.json --port 3001
   ```
5. **Rode o projeto:**
   ```bash
   pnpm dev # ou npm run dev ou yarn dev
   ```
6. **Acesse:** [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testes

- Todos os testes estão em `__tests__/`
- Para rodar:
  ```bash
  pnpm test # ou npm test ou yarn test
  ```
- Testes de snapshot, unitários e integrados

---

## 📚 Boas Práticas e Arquitetura

- **DDD + Clean Architecture**
- **Injeção de dependência** com TSyringe
- **Validação centralizada** com Zod
- **Hooks personalizados** para lógica de UI
- **Componentes isolados** e importação centralizada
- **SOLID e Clean Code**

---

## 🧭 Roadmap e Diferenciais

- [x] Estrutura baseada em Clean Architecture
- [x] Validação de formulários com Zod
- [x] Seed com Fake Store API
- [x] Persistência com JSONPlaceholder
- [x] Injeção de dependência com TSyringe
- [x] Estado com Zustand
- [x] Testes com Vitest
- [x] Responsividade
- [x] Paginação
- [x] Documentação clara
- [x] Teste de snapshot

---

## 🏆 Critérios de Avaliação

1. **Organização do código**
2. **Cumprimento dos requisitos**
3. **Qualidade do código** (SOLID, DRY, etc.)
4. **Testes** (abrangência e eficiência)
5. **Extras entregues**

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga as boas práticas do projeto e abra um PR.

---

## 📖 Saiba mais

- [Next.js Docs](https://nextjs.org/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zod Docs](https://zod.dev/)
- [TSyringe Docs](https://github.com/microsoft/tsyringe)

---

> Projeto desenvolvido para o teste técnico de frontend e backend.
