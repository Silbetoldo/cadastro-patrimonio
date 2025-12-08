const bcrypt = require("bcryptjs"); // Biblioteca para criptografar e comparar senhas
const { prisma } = require("../config/prismaClient"); // Conexão com o banco via Prisma
const { generateToken } = require("../middlewares/authMiddleware"); // Função que gera o token JWT

// ======================================================
// FUNÇÃO PARA REGISTRAR UM NOVO USUÁRIO
// ======================================================
async function register(req, res) {
  try {
    const { name, email, password } = req.body; // Dados enviados pelo cliente

    // Verifica se todos os campos obrigatórios foram enviados
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'name', 'email' and 'password' are required." });
    }

    // Criptografa a senha antes de salvar no banco
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash // Armazena apenas a senha criptografada
      }
    });

    // Retorna apenas informações não sensíveis
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Erro do Prisma quando o e-mail já está cadastrado
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Qualquer outro erro
    return res.status(500).json({
      error: "Error registering user.",
      code: error.code,
      message: error.message,
      meta: error.meta
    });
  }
}

// ======================================================
// FUNÇÃO DE LOGIN
// ======================================================
async function login(req, res) {
  try {
    const { email, password } = req.body; // Dados enviados pelo cliente

    // Validação dos campos obrigatórios
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'email' and 'password' are required." });
    }

    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    // Se o usuário não existir, retorna erro genérico
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Compara a senha digitada com a senha criptografada do banco
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Gera o token JWT para manter o usuário logado
    const token = generateToken(user);

    // Retorna o token e os dados básicos do usuário
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
}

// Exporta as funções para serem usadas nas rotas
module.exports = {
  register,
  login
};
