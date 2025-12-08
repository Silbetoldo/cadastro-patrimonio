const jwt = require("jsonwebtoken"); // Biblioteca responsável por criar e validar tokens JWT

// Chave secreta usada para assinar e validar o token.
// Em produção deve estar no arquivo .env, aqui tem um valor padrão para desenvolvimento.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// Middleware que autentica o token JWT enviado pelo cliente
function authenticateToken(req, res, next) {
  // Pega o header "Authorization" da requisição
  const authHeader = req.headers["authorization"];

  // O token normalmente vem no formato: "Bearer tokenAqui",
  // então fazemos o split para pegar só a segunda parte
  const token = authHeader && authHeader.split(" ")[1];

  // Se não veio token, já bloqueia o acesso
  if (!token) {
    return res.status(401).json({ error: "Access token is missing." });
  }

  // Verifica se o token é válido e não expirou
  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }

    // Se o token for válido, salva os dados do usuário dentro da requisição
    req.user = userPayload;

    // next() permite que a requisição continue para a próxima etapa
    next();
  });
}

// Função para gerar um token JWT quando o usuário faz login
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,      // ID do usuário que vai dentro do token
      email: user.email // Email também é armazenado para referência
    },
    JWT_SECRET,         // Chave secreta usada para assinar o token
    { expiresIn: "30m" } // Tempo de expiração do token (30 minutos)
  );
}

// Exporta as funções para serem usadas em outras partes do sistema
module.exports = {
  authenticateToken,
  generateToken
};
