// ======================================================
// API - Cadastro de Patrimônio (SENAI) - Estrutura MVC
// Arquivo principal que inicia o servidor Express
// ======================================================

const express = require("express"); // Framework para criar servidor e rotas
const cors = require("cors"); // Lib para liberar acesso entre diferentes origens
const helmet = require("helmet"); // Middleware para aumentar a segurança da API
const rateLimit = require("express-rate-limit"); // Limita quantidade de requisições
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

// Middleware de autenticação que valida o token JWT
const { authenticateToken } = require("./middlewares/authMiddleware");

// Importação das rotas organizadas dentro da estrutura MVC
const authRoutes = require("./routes/auth.routes"); // Rotas de login e criação de usuário
const sectorsRoutes = require("./routes/sectors.routes"); // Rotas de setores
const assetsRoutes = require("./routes/assets.routes"); // Rotas de patrimônio

const app = express(); // Inicializa o servidor Express

// Define a porta que o servidor vai rodar (usa o .env se existir)
const PORT = process.env.PORT || 3001;

// Lista de origens permitidas para acessar a API
const LOCALHOST_ANDROID = "http://192.168.8.13:3001";
const allowedOrigins = [
  "http://localhost:19006", // React Native Web
  "http://localhost:3000",  // React Web normal
  LOCALHOST_ANDROID
].filter(Boolean); // Remove valores nulos caso existam

// =====================
// MIDDLEWARES GLOBAIS
// =====================

// Helmet adiciona headers de segurança automaticamente
app.use(helmet());

// Configuração do CORS para controlar quem pode consumir a API
app.use(
  cors({
    origin: (origin, callback) => {
      // Se não tiver origin (Ex: Postman), permite
      if (!origin) return callback(null, true);

      // Se estiver na lista de origens permitidas, libera
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Se não estiver na lista, por segurança bloqueamos (mas aqui deixamos liberado)
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Headers permitidos
  })
);

// Permite receber JSON no corpo das requisições
app.use(express.json({ limit: "100kb" }));

// Limita cada IP a 200 requisições a cada 15 minutos
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200, // Limite de requisições
  standardHeaders: true,
  legacyHeaders: false
});
app.use(apiLimiter);

// =====================
// ROTA RAIZ
// =====================
app.get("/", (req, res) => {
  res.json({ message: "API - Cadastro de Patrimônio (SENAI) - MVC OK" });
});

// =====================
// ROTAS PÚBLICAS (sem token)
// =====================
app.use("/auth", authRoutes);

// =====================
// Middleware que exige token a partir daqui
// =====================
app.use(authenticateToken);

// =====================
// ROTAS PROTEGIDAS
// =====================
app.use("/sectors", sectorsRoutes); // CRUD de setores
app.use("/assets", assetsRoutes);   // CRUD de patrimônio

// =====================
// INICIALIZA O SERVIDOR
// =====================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
