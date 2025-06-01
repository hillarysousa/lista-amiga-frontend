# Lista Amiga – Frontend

Este é o frontend da aplicação **Lista Amiga**, uma plataforma para criar e compartilhar listas com amigos e familiares. Desenvolvido com **Next.js** e **TypeScript**, integrado ao **Firebase** para autenticação e estilizado com **Tailwind**.

🔗 Acesse a aplicação (disponível apenas em dispositivos móveis): [listaamiga.vercel.app](https://listaamiga.vercel.app)

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://pt-br.legacy.reactjs.org/)
- [Firebase Authentication](https://firebase.google.com/?hl=pt-br)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 📁 Estrutura do Projeto

```
lista-amiga-frontend/
├── src/
│   └── app/
│       └── (routes)/    # Rotas da aplicação
│       └── assets/      # Arquivos de imagem e svg
│       └── components/  # Componentes reutilizáveis
│       └── hooks/       # Hooks para chamadas ao backend
│       └── providers/   # Providers para integrar serviços globais do projeto
│       └── types/       # Tipos personalizados
│       └── utils/       # Funções utilitárias
├── .gitignore
├── .nvmrc
├── README.md
├── eslint.config.mjs
├── firebase-config.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## ⚙️ Configuração e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://classic.yarnpkg.com/en/)

### Passos para executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/hillarysousa/lista-amiga-frontend.git
cd lista-amiga-frontend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_BACKEND_URL=url_do_backend
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

Substitua os valores acima pelas informações do seu projeto no Firebase e do backend.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em http://localhost:4000.

## 🧪 Testes

Este projeto ainda não possui testes automatizados implementados. Contribuições são bem-vindas!

## 📄 Licença

Este projeto está licenciado sob a Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

Você pode:

- Compartilhar e adaptar o código para fins não comerciais.
- Usar o código para fins comerciais somente com permissão expressa.

A licença completa pode ser encontrada em
[Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br).

---

Para mais informações sobre a desenvolvedora, visite o [perfil no GitHub](https://github.com/hillarysousa) ou o [portfólio](https://hillarysousa.com.br).
