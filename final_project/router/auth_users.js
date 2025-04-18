const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

// Armazenamento de usuários registrados
// Registered users storage
let users = {}; // Ex: users = { "joao": { password: "123" } }

// Verifica se o nome de usuário existe
// Checks if the username exists
const isValid = (username) => {
  return users.hasOwnProperty(username);
};

// Verifica se o nome de usuário e senha são válidos
// Validates if username and password are correct
const authenticatedUser = (username, password) => {
  return isValid(username) && users[username].password === password;
};

// Endpoint para login de usuários registrados
// Login endpoint for registered users
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuário e senha são obrigatórios | Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Credenciais inválidas | Invalid credentials" });
  }

  // Geração de token JWT
  // Generate JWT token
  let accessToken = jwt.sign({ username }, 'access', { expiresIn: 3600 });

  // Armazena token e nome de usuário na sessão
  // Store token and username in session
  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({
    message: "Login bem-sucedido | Login successful",
    token: accessToken
  });
});

// Middleware de autenticação para proteger rotas
// Authentication middleware to protect routes
const authMiddleware = (req, res, next) => {
  if (!req.session.authorization || !req.session.authorization.accessToken) {
    return res.status(401).json({ message: "Usuário não autenticado | User not logged in" });
  }
  next();
};

// Adiciona ou modifica uma revisão de livro
// Adds or updates a book review
regd_users.put("/auth/review/:isbn", authMiddleware, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Livro não encontrado | Book not found" });
  }

  if (!review) {
    return res.status(400).json({ message: "Revisão obrigatória | Review is required" });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Revisão adicionada/modificada com sucesso | Review added/updated successfully",
    review: {
      username,
      isbn,
      content: review
    }
  });
});

// Deleta uma revisão de livro do usuário autenticado
// Deletes a book review by the authenticated user
regd_users.delete("/auth/review/:isbn", authMiddleware, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn] || !books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Revisão não encontrada para este usuário | Review not found for this user" });
  }

  const deletedReview = books[isbn].reviews[username];
  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Revisão deletada com sucesso | Review deleted successfully",
    deletedReview: {
      username,
      isbn,
      content: deletedReview
    }
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
