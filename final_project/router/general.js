const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Registro de usuários | User registration
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Verifica se os campos foram fornecidos | Check if all fields are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Usuário e senha são obrigatórios | Username and password are required" });
  }

  // Verifica se o usuário já existe | Check if user already exists
  if (users[username]) {
    return res.status(409).json({ message: "Usuário já existe | Username already exists" });
  }

  // Registra o novo usuário | Register new user
  users[username] = { password };
  return res.status(201).json({ message: "Usuário registrado com sucesso | User registered successfully" });
});


// Retorna todos os livros usando async/await com Axios
// Get all books using async/await with Axios
public_users.get("/", async (req, res) => {
  try {
    // Simula requisição assíncrona como se fosse externa
    const getBooks = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(books), 500); // Simulação de delay
      });
    };

    const bookList = await getBooks();
    return res.status(200).json(bookList);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar livros | Error retrieving books" });
  }
});


// Retorna detalhes do livro por ISBN com async/await
// Get book details by ISBN using async/await
public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const getBookByISBN = () => {
      return new Promise((resolve, reject) => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject("Livro não encontrado | Book not found");
        }
      });
    };

    const book = await getBookByISBN();
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});


// Retorna livros por autor usando async/await
// Get books by author using async/await
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author.toLowerCase();

  try {
    const getBooksByAuthor = () => {
      return new Promise((resolve, reject) => {
        const filtered = Object.values(books).filter(book => book.author.toLowerCase() === author);
        if (filtered.length > 0) {
          resolve(filtered);
        } else {
          reject("Nenhum livro encontrado para este autor | No books found for this author");
        }
      });
    };

    const result = await getBooksByAuthor();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});


// Retorna livros por título usando async/await
// Get books by title using async/await
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title.toLowerCase();

  try {
    const getBooksByTitle = () => {
      return new Promise((resolve, reject) => {
        const filtered = Object.values(books).filter(book => book.title.toLowerCase() === title);
        if (filtered.length > 0) {
          resolve(filtered);
        } else {
          reject("Nenhum livro encontrado com este título | No books found with this title");
        }
      });
    };

    const result = await getBooksByTitle();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});


// Retorna reviews de um livro com base no ISBN
// Get reviews of a book by ISBN
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Livro não encontrado | Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
