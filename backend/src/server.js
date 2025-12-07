// src/server.js
// ======================================================
// API - Cadastro de Patrimônio (SENAI)
// Com Login / Cadastro de Usuário + Boas Práticas de Segurança
// ======================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client"); // 👈 removeu UserRole
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

// Porta do servidor (definida no .env ou 3001 por padrão)
const PORT = process.env.PORT || 3001;

// Segredo usado para assinar o JWT
// Em produção, SEMPRE no .env
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// Exemplo de IP da rede local (para testar em celular Android)
const LOCALHOST_ANDROID = "http://192.168.8.13:3001";

// ======================================================
// MIDDLEWARES GLOBAIS DE SEGURANÇA
// ======================================================

// Helmet adiciona cabeçalhos HTTP de segurança
app.use(helmet());

// CORS → controla quais origens (front-ends) podem consumir a API
const allowedOrigins = [
  "http://localhost:19006", // Expo Web
  "http://localhost:3000",  // React Web
  LOCALHOST_ANDROID
].filter(Boolean); // remove valores undefined/nulos

app.use(
  cors({
    origin: (origin, callback) => {
      // Em Insomnia/Postman o origin é undefined → liberamos
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Em produção, poderia bloquear. Aqui deixamos aberto p/ testes.
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Express JSON com limite de 100kb → evita payload gigante
app.use(express.json({ limit: "100kb" }));

// Rate limit: limita requisições por IP para evitar abuso
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,                 // máx 200 req/IP/15min
  standardHeaders: true,
  legacyHeaders: false
});

app.use(apiLimiter);

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

// Gera token JWT com dados mínimos do usuário logado
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
      // não usamos mais "role"
    },
    JWT_SECRET,
    { expiresIn: "30m" } // token expira em 30 minutos
  );
}

// Middleware: autentica token JWT enviado no header Authorization
function authenticateToken(req, res, next) {
  // Espera "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is missing." });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }

    // Salva o payload do usuário no request
    req.user = userPayload;
    next();
  });
}

// Função para validar ID inteiro positivo
function parseAndValidateId(paramId, res) {
  const id = Number(paramId);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id parameter." });
    return null;
  }
  return id;
}

// ======================================================
// ROTA RAIZ (status da API)
// ======================================================
app.get("/", (req, res) => {
  res.json({ message: "API - Cadastro de Patrimônio (SENAI) - Auth Enabled" });
});

/**
 * ====================================================
 *                AUTENTICAÇÃO (LOGIN / CADASTRO)
 * ====================================================
 */

// Cadastro de usuário (REGISTER)
// Vários usuários podem se cadastrar, todos com o mesmo nível de acesso.
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação simples dos campos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'name', 'email' and 'password' are required." });
    }

    // Criptografa a senha
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash
      }
    });

    // Não devolve a senha para o front
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // P2002 → unique violation (email já existe)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already registered." });
    }

    return res.status(500).json({
      error: "Error registering user.",
      code: error.code,
      message: error.message,
      meta: error.meta
    });
  }
});

// Login: recebe email/senha, devolve JWT
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'email' and 'password' are required." });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compara senha enviada com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login." });
  }
});

// ======================================================
// A PARTIR DAQUI: TODAS AS ROTAS PRECISAM DE TOKEN
// ======================================================
app.use(authenticateToken);

/**
 * ====================================================
 *                     SETORES
 * ====================================================
 */

// Listar setores (qualquer usuário autenticado)
app.get("/sectors", async (req, res) => {
  try {
    const sectors = await prisma.sector.findMany({
      orderBy: { name: "asc" }
    });
    res.json(sectors);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ error: "Error fetching sectors." });
  }
});

// Buscar setor por ID
app.get("/sectors/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const sector = await prisma.sector.findUnique({
      where: { id },
      include: { assets: true }
    });

    if (!sector) {
      return res.status(404).json({ error: "Sector not found." });
    }

    res.json(sector);
  } catch (error) {
    console.error("Error fetching sector:", error);
    res.status(500).json({ error: "Error fetching sector." });
  }
});

// Criar setor
app.post("/sectors", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }

    const newSector = await prisma.sector.create({
      data: { name: name.trim() }
    });

    res.status(201).json(newSector);
  } catch (error) {
    console.error("Error creating sector:", error);
    res.status(500).json({ error: "Error creating sector." });
  }
});

// Atualizar setor
app.put("/sectors/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }

    const sectorExists = await prisma.sector.findUnique({ where: { id } });
    if (!sectorExists) {
      return res.status(404).json({ error: "Sector not found." });
    }

    const updatedSector = await prisma.sector.update({
      where: { id },
      data: { name: name.trim() }
    });

    res.json(updatedSector);
  } catch (error) {
    console.error("Error updating sector:", error);
    res.status(500).json({ error: "Error updating sector." });
  }
});

// Deletar setor (qualquer usuário autenticado)
app.delete("/sectors/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const sector = await prisma.sector.findUnique({
      where: { id },
      include: { assets: true }
    });

    if (!sector) {
      return res.status(404).json({ error: "Sector not found." });
    }

    if (sector.assets.length > 0) {
      return res.status(400).json({
        error:
          "Sector cannot be deleted because there are assets linked to it."
      });
    }

    await prisma.sector.delete({ where: { id } });

    res.json({ message: "Sector deleted successfully." });
  } catch (error) {
    console.error("Error deleting sector:", error);
    res.status(500).json({ error: "Error deleting sector." });
  }
});

/**
 * ====================================================
 *                    PATRIMÔNIOS
 * ====================================================
 */

// Listar patrimônios (qualquer usuário autenticado)
app.get("/assets", async (req, res) => {
  try {
    const assets = await prisma.asset.findMany({
      include: { sector: true },
      orderBy: { createdAt: "desc" }
    });

    const mapped = assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      assetNumber: asset.assetNumber,
      sectorId: asset.sectorId,
      sectorName: asset.sector?.name ?? null,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Error fetching assets." });
  }
});

// Buscar patrimônio por ID
app.get("/assets/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: { sector: true }
    });

    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    res.json({
      id: asset.id,
      name: asset.name,
      assetNumber: asset.assetNumber,
      sectorId: asset.sectorId,
      sectorName: asset.sector?.name ?? null,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Error fetching asset." });
  }
});

// Criar patrimônio
app.post("/assets", async (req, res) => {
  try {
    let { name, assetNumber, sectorId } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }
    if (
      !assetNumber ||
      typeof assetNumber !== "string" ||
      assetNumber.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Field 'assetNumber' is required." });
    }

    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
    }

    const sectorExists = await prisma.sector.findUnique({
      where: { id: sectorId }
    });
    if (!sectorExists) {
      return res.status(400).json({ error: "Sector does not exist." });
    }

    const newAsset = await prisma.asset.create({
      data: {
        name: name.trim(),
        assetNumber: assetNumber.trim(),
        sectorId
      }
    });

    res.status(201).json(newAsset);
  } catch (error) {
    console.error("Error creating asset:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error creating asset." });
  }
});

// Atualizar patrimônio
app.put("/assets/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    let { name, assetNumber, sectorId } = req.body;

    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }
    if (
      !assetNumber ||
      typeof assetNumber !== "string" ||
      assetNumber.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Field 'assetNumber' is required." });
    }

    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
    }

    const sectorExists = await prisma.sector.findUnique({
      where: { id: sectorId }
    });
    if (!sectorExists) {
      return res.status(400).json({ error: "Sector does not exist." });
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: {
        name: name.trim(),
        assetNumber: assetNumber.trim(),
        sectorId
      }
    });

    res.json(updatedAsset);
  } catch (error) {
    console.error("Error updating asset:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error updating asset." });
  }
});

// Deletar patrimônio (qualquer usuário autenticado)
app.delete("/assets/:id", async (req, res) => {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    await prisma.asset.delete({ where: { id } });

    res.json({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Error deleting asset." });
  }
});

// ======================================================
// INICIAR SERVIDOR
// ======================================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
