const express = require("express"); // Importa o Express para criar o sistema de rotas
const authController = require("../controllers/authController"); // Importa o controller responsável por registrar e logar usuários

const router = express.Router(); // Cria um roteador específico para as rotas de autenticação

// Rota para registrar um novo usuário no sistema
router.post("/register", authController.register);

// Rota para fazer login e gerar o token JWT
router.post("/login", authController.login);

// Exporta o router para o servidor principal poder usar essas rotas
module.exports = router;
