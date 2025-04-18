
# Book Review API

API for user authentication and book review management. Developed as a learning project using Node.js and Express.

API para autenticação de usuários e gerenciamento de resenhas de livros. Desenvolvido como um projeto de aprendizado usando Node.js e Express.

---

## Features | Funcionalidades

- 📦 List all books | Listagem de todos os livros
- 🔍 Get book by ISBN, author, or title | Buscar livro por ISBN, autor ou título
- 📝 Add, update and delete book reviews | Adicionar, atualizar e deletar resenhas
- 🔐 User registration and login with JWT and session | Registro e login de usuários com JWT e sessão
- ✅ Middleware protection for authenticated routes | Proteção de rotas com middleware

---

## Tech Stack | Tecnologias Utilizadas

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **JWT (jsonwebtoken)** - Authentication via tokens
- **Express-session** - Session management
- **Axios** - HTTP requests with Promises/Async-Await
- **Postman** - For testing the API (recommended)

---

## Project Structure | Estrutura do Projeto

```
.
├── index.js                # Entry point
├── router/
│   ├── auth_users.js      # Authenticated user routes
│   └── general.js         # Public/general routes
│   └── booksdb.js         # In-memory book database
└── README.md              # Project documentation
```

---

## API Endpoints (Examples)

- `POST /register` – Register new user
- `POST /customer/login` – Login and receive JWT
- `GET /` – List all books
- `GET /isbn/:isbn` – Get book by ISBN
- `GET /author/:author` – Get books by author
- `GET /title/:title` – Get books by title
- `PUT /customer/auth/review/:isbn?review=...` – Add/update review (auth required)
- `DELETE /customer/auth/review/:isbn` – Delete review (auth required)

---

## How to Test | Como Testar

1. Start the server: `node index.js`
2. Use [Postman](https://www.postman.com) to make requests.
3. Use session cookies for authenticated routes.

---


Desenvolvido como parte de um exercício de backend e prática de autenticação com Node.js.

Developed as part of a backend exercise and authentication practice with Node.js.
