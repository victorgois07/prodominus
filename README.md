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

- **Next.js 15 (App Router)**: Framework React para renderização no servidor (SSR) e geração de sites estáticos (SSG), proporcionando performance e SEO aprimorados. O App Router simplifica o roteamento e a organização de layouts.
- **React** + **TypeScript**: Biblioteca para construção de interfaces de usuário com componentização e tipagem estática para maior robustez e manutenibilidade do código.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida e customizável, permitindo a criação de designs modernos sem sair do HTML.
- **Zustand (estado global)**: Gerenciador de estado minimalista e flexível, ideal para compartilhar estado entre componentes de forma simples e eficiente, sem boilerplate excessivo.
- **React Hook Form** + **Zod (validação de formulários)**: `React Hook Form` para gerenciamento de formulários performático e `Zod` para validação de esquemas de dados, garantindo a integridade dos dados de entrada.
- **TSyringe (injeção de dependência)**: Biblioteca para inversão de controle (IoC) e injeção de dependência, facilitando o desacoplamento de módulos e a testabilidade.
- **Vitest (testes unitários, integrados e snapshots)**: Framework de testes rápido e moderno, compatível com Vite, utilizado para garantir a qualidade e o comportamento esperado dos componentes e lógicas de negócio.
- **JSON Server (mock de CRUD local)**: Ferramenta que cria uma API RESTful completa a partir de um arquivo JSON (`db.json`), permitindo simular um backend para desenvolvimento e testes locais de forma rápida e simples.
- **Atomic Design (atoms, molecules, organisms)**: Metodologia de design de interfaces que organiza componentes em níveis de complexidade (átomos, moléculas, organismos), promovendo reusabilidade e consistência visual.

---

## 📦 Estrutura de Pastas

A estrutura de pastas foi organizada para promover a separação de responsabilidades, seguindo princípios da Clean Architecture e facilitando a navegação e manutenção do código.

```
/
├── src/                    # Contém todo o código fonte da aplicação.
│   ├── app/                # Responsável pela interface do usuário e roteamento (Next.js App Router).
│   │   └── components/     # Componentes React reutilizáveis, seguindo o Atomic Design.
│   │       ├── atoms/      # Os menores componentes, blocos básicos de construção da UI (ex: Button, Input).
│   │       ├── molecules/  # Combinações de átomos para formar componentes mais complexos (ex: FormField).
│   │       ├── organisms/  # Conjuntos de moléculas e/ou átomos para formar seções da interface (ex: ProductForm).
│   │       └── index.ts    # Ponto de exportação centralizado para os componentes.
│   ├── business/           # Lógica de negócio da aplicação, independente da UI e da infraestrutura.
│   │   ├── controllers/    # Orquestram as interações entre a UI (app) e os casos de uso (services).
│   │   ├── hooks/          # Hooks React customizados para lógica de apresentação e estado local de componentes.
│   │   ├── models/         # Definições de esquemas de validação com Zod para entidades e DTOs.
│   │   ├── dtos/           # Data Transfer Objects - estruturas de dados para transferir informações entre camadas.
│   │   └── store/          # Configuração e lógica do gerenciador de estado global (Zustand).
│   ├── domain/             # Camada mais interna, contém as entidades e regras de negócio puras.
│   │   └── entities/       # Representações das entidades de negócio principais da aplicação (ex: Product).
│   ├── infra/              # Camada de infraestrutura, lida com detalhes externos como APIs e bibliotecas.
│   │   ├── repositories/   # Implementações dos repositórios para acesso e persistência de dados.
│   │   └── container/      # Configuração da injeção de dependência com TSyringe.
│   └── services/           # Casos de Uso (Use Cases) da aplicação, orquestram a lógica de negócio.
├── __tests__/              # Contém todos os arquivos de teste (unitários, integrados, snapshots).
├── public/                 # Arquivos estáticos públicos servidos diretamente (ex: favicon, imagens).
├── db.json                 # Arquivo JSON utilizado pelo JSON Server para simular o backend local.
```

---

## 🧩 Atomic Design

A metodologia Atomic Design é aplicada na organização dos componentes React dentro de `src/app/components/`. Essa abordagem divide a interface em blocos de construção reutilizáveis, facilitando a manutenção e a consistência visual.

- **Atoms (`src/app/components/atoms/`)**: São os menores blocos de construção da UI, elementos HTML básicos estilizados ou pequenos componentes indivisíveis.

  - _Exemplos no projeto_: `Button`, `Input`, `Label`, `Modal`, `Toast` (conforme exemplos de componentes que podem existir ou que foram planejados).

- **Molecules (`src/app/components/molecules/`)**: São grupos de átomos que funcionam juntos como uma unidade. Representam componentes um pouco mais complexos e com uma funcionalidade específica.

  - _Exemplos no projeto_: `FormField` (combinando `Label` e `Input`), `FilterBar` (contendo inputs para nome e preço), `SortControls` (com opções de ordenação).

- **Organisms (`src/app/components/organisms/`)**: São seções mais complexas da interface, compostas por moléculas e/ou átomos, que formam partes distintas de uma página.
  - _Exemplos no projeto_: `ProductForm` (para cadastro e edição de produtos), `ProductGrid` (para listar os produtos), `ProductCard` (para exibir um produto individualmente na listagem).

Essa estrutura promove a reutilização, pois átomos podem ser usados em diversas moléculas, e moléculas em diversos organismos, garantindo uma UI coesa e escalável.

---

## 🛒 APIs Utilizadas

- **JSON Server**: <http://localhost:3001> (mock backend local)

---

## ⚙️ Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/victorgois07/prodominus.git
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

- **DDD (Domain-Driven Design) + Clean Architecture**:
  - **DDD**: Abordagem de design de software que foca no domínio do negócio, modelando o software em torno dos conceitos e regras desse domínio. Facilita a comunicação entre desenvolvedores e especialistas do negócio.
  - **Clean Architecture**: Organiza o código em camadas independentes (Entidades, Casos de Uso, Adaptadores de Interface, Frameworks e Drivers), com a regra de dependência apontando sempre para o interior. Isso promove baixo acoplamento, alta coesão, testabilidade e manutenibilidade. O objetivo é separar as preocupações, tornando o núcleo da aplicação (lógica de negócio) independente de frameworks e tecnologias de UI, banco de dados, etc.
- **Injeção de dependência com TSyringe**:
  - Permite que as dependências de uma classe sejam fornecidas externamente, em vez de serem criadas internamente. Isso reduz o acoplamento entre os componentes, facilita a substituição de implementações (especialmente para testes) e melhora a modularidade do código. TSyringe é utilizado para gerenciar o ciclo de vida e a instanciação dessas dependências.
- **Validação centralizada com Zod**:
  - Define esquemas (schemas) para validar a estrutura e os tipos de dados em diferentes partes da aplicação (formulários, DTOs, respostas de API). Centralizar a validação com Zod garante consistência e evita a duplicação de lógicas de validação, tornando o código mais robusto e fácil de manter.
- **Hooks personalizados para lógica de UI**:
  - Encapsulam lógica de estado e efeitos colaterais relacionados à interface do usuário, tornando os componentes mais limpos e reutilizáveis. Permitem compartilhar lógica complexa entre múltiplos componentes sem recorrer a padrões como Higher-Order Components (HOCs) ou Render Props de forma excessiva.
- **Componentes isolados e importação centralizada**:
  - No Atomic Design, cada componente (átomo, molécula, organismo) é desenvolvido de forma isolada, focando em uma única responsabilidade. A importação centralizada (geralmente através de um arquivo `index.ts` em cada diretório de componentes) simplifica o uso desses componentes em outras partes da aplicação e facilita a refatoração.
- **SOLID e Clean Code**:
  - **SOLID**: Conjunto de cinco princípios de design orientado a objetos que visam tornar o software mais compreensível, flexível e manutenível.
    - **S**ingle Responsibility Principle (SRP): Cada classe/módulo deve ter uma única responsabilidade.
    - **O**pen/Closed Principle (OCP): Entidades de software devem ser abertas para extensão, mas fechadas para modificação.
    - **L**iskov Substitution Principle (LSP): Objetos de uma superclasse devem ser substituíveis por objetos de suas subclasses sem afetar a corretude do programa.
    - **I**nterface Segregation Principle (ISP): Clientes não devem ser forçados a depender de interfaces que não utilizam.
    - **D**ependency Inversion Principle (DIP): Módulos de alto nível не devem depender de módulos de baixo nível; ambos devem depender de abstrações. Abstrações не devem depender de detalhes; detalhes devem depender de abstrações.
  - **Clean Code**: Práticas de escrita de código que priorizam a legibilidade, clareza e simplicidade, tornando o código fácil de entender, manter e modificar por outros desenvolvedores (e por você mesmo no futuro).

---

## 🧭 Roadmap e Diferenciais

- [x] Estrutura baseada em Clean Architecture
- [x] Validação de formulários com Zod
- [x] Persistência com JSON Server
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
