// ======================================================
// API - Cadastro de Patrimônio (SENAI) - Estrutura MVC
// ======================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { authenticateToken } = require("./middlewares/authMiddleware");

// Rotas
const authRoutes = require("./routes/auth.routes");
const sectorsRoutes = require("./routes/sectors.routes");
const assetsRoutes = require("./routes/assets.routes");

const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3001;

// CORS
const LOCALHOST_ANDROID = "http://192.168.8.13:3001";
const allowedOrigins = [
  "http://localhost:19006",
  "http://localhost:3000",
  LOCALHOST_ANDROID
].filter(Boolean);

// Middlewares globais
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json({ limit: "100kb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(apiLimiter);

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "API - Cadastro de Patrimônio (SENAI) - MVC OK" });
});

// Rotas públicas (sem token)
app.use("/auth", authRoutes);

// A partir daqui, tudo exige token
app.use(authenticateToken);

// Rotas protegidas
app.use("/sectors", sectorsRoutes);
app.use("/assets", assetsRoutes);

// Sobe servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
