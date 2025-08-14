# 🍕 +Rango

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[Docker](https://www.docker.com/)** e **[Docker Compose](https://docs.docker.com/compose/)**
- **[Git](https://git-scm.com/)**

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Tiago0Br/plus_rango.git
   cd plus_rango
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   # Database
   DATABASE_URL="postgresql://docker:docker@localhost:5432/plus_rango"
   
   # NextAuth
   NEXTAUTH_SECRET="seu-secret-super-secreto"
   
   # OAuth Providers (opcional)
   GOOGLE_CLIENT_ID="seu-google-client-id"
   GOOGLE_CLIENT_SECRET="seu-google-client-secret"
   ```

4. **Inicie o banco de dados PostgreSQL com Docker**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate deploy
   ```

6. **Popule o banco com dados iniciais (opcional)**
   ```bash
   npx prisma db seed
   ```

7. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

8. **Acesse a aplicação**
   
   Abra seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

### 📱 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack
- `npm run build` - Gera o build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linting do código
- `npx prisma studio` - Abre o Prisma Studio para visualizar o banco de dados
- `npx prisma migrate dev` - Executa migrações pendentes
- `npx prisma db seed` - Popula o banco com dados iniciais

### 🗄️ Estrutura do Projeto

```
plus_rango/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── api/               # API Routes
│   │   ├── categories/        # Páginas de categorias
│   │   ├── products/          # Páginas de produtos
│   │   └── restaurants/       # Páginas de restaurantes
│   ├── components/            # Componentes React reutilizáveis
│   │   ├── ui/               # Componentes de UI (Shadcn)
│   │   ├── products/         # Componentes específicos de produtos
│   │   └── restaurants/      # Componentes específicos de restaurantes
│   ├── context/              # Contextos React (ex: Carrinho)
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilitários e configurações
│   └── providers/            # Providers React
├── prisma/                   # Schema e migrações do Prisma
├── public/                   # Arquivos estáticos
└── docker-compose.yml        # Configuração do PostgreSQL
```

### 🔄 Gerenciamento do Banco de Dados

```bash
# Visualizar o banco de dados
npx prisma studio

# Resetar o banco de dados
npx prisma migrate reset

# Gerar o cliente Prisma após mudanças no schema
npx prisma generate
```

## 🎨 Recursos Visuais

- **Design Responsivo**: Otimizado para dispositivos móveis e desktop
- **Tema Escuro/Claro**: Suporte a temas com next-themes
- **Componentes Modernos**: Interface construída com Shadcn/UI
- **Animações Suaves**: Transições elegantes com TailwindCSS
- **Ícones Lucide**: Ícones modernos e consistentes

## 🔐 Autenticação

O projeto utiliza NextAuth.js para autenticação, com suporte a:
- Provedores OAuth (Google, GitHub, etc.)
- Autenticação por email/senha
- Sessões seguras
- Integração com Prisma Adapter

## Sobre o projeto

  **Uma plataforma moderna de delivery de comidas inspirada no iFood**

  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)]()
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)]()
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)]()
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
</div>

## 📋 Descrição

O **+Rango** é uma aplicação completa de delivery de comidas e bebidas, desenvolvida como um clone moderno do iFood. O projeto oferece uma experiência completa de usuário, desde a navegação por restaurantes e produtos até o gerenciamento de pedidos e favoritos.

### ✨ Principais Funcionalidades

- 🏪 **Navegação por Restaurantes**: Explore uma variedade de restaurantes disponíveis
- 🍔 **Catálogo de Produtos**: Visualize produtos organizados por categorias
- 🛒 **Carrinho de Compras**: Adicione produtos e gerencie seu pedido
- ❤️ **Restaurantes Favoritos**: Marque e gerencie seus restaurantes preferidos
- 📱 **Interface Responsiva**: Experiência otimizada para mobile e desktop
- 🔐 **Autenticação**: Sistema de login seguro com NextAuth
- 📦 **Histórico de Pedidos**: Acompanhe seus pedidos anteriores
- 🔍 **Busca**: Encontre restaurantes e produtos facilmente

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com SSR e SSG
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript com tipagem estática
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Shadcn/UI](https://ui.shadcn.com/)** - Componentes de UI reutilizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes

### Backend & Database
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação para Next.js

### Ferramentas de Desenvolvimento
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados
- **[ESLint](https://eslint.org/)** - Linting de código
- **[PostCSS](https://postcss.org/)** - Processamento de CSS


##  📖 Documentação e materias de referência

- [Levantamento de Requisitos](https://docs.google.com/document/d/1gko95P6xtjjKrhgrbQcqI2jacFjAerkW/edit?usp=share_link&ouid=102447472006633729895&rtpof=true&sd=true)
- [Protótipo do aplicativo](https://www.figma.com/file/JfaAXdoJOcWlPrYHcQTp03/%2BRango?node-id=0%3A1&t=KtgLLUWKg52EwjF0-1)
- [Dicionário de dados](https://docs.google.com/spreadsheets/d/1qQEIBslesk1oslQ6iW43qxBs15md_HnT/edit?usp=share_link&ouid=102447472006633729895&rtpof=true&sd=true)
- [Diagrama entidade-relacionamento (DER)](https://drive.google.com/file/d/1i_f6mTHriHjkXSCT2mZmXT5bqSaH74k4/view?usp=share_link)

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você tiver dúvidas ou precisar de ajuda, sinta-se à vontade para abrir uma issue no repositório.

---

<div align="center">
  Feito com 💜 &nbsp;por <a href="https://www.tiagolopes.bio">Tiago Lopes</a>, Leandro Zago, <a href="https://github.com/robertojr20">Roberto Varela</a> e Ederson Bairros 👋
</div>