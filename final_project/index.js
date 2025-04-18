const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Middleware de sessão para usuários clientes
// Session middleware for customer users
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Rotas para clientes registrados
// Routes for registered customers
app.use("/customer", customer_routes);

// Rotas gerais públicas
// General public routes
app.use("/", genl_routes);

// Inicialização do servidor
// Server startup
const PORT = 5000;
app.listen(PORT, () => console.log("Server is running"));
