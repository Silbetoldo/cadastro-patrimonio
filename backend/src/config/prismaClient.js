// Importa a classe PrismaClient do pacote @prisma/client.
// Essa classe é responsável por conectar nossa aplicação ao banco de dados.
const { PrismaClient } = require("@prisma/client");

// Aqui estamos criando uma instância do PrismaClient.
// É através dessa instância que vamos fazer todas as operações no banco,
// como criar, buscar, atualizar ou deletar registros.
const prisma = new PrismaClient();

// Exportamos o prisma para poder usar ele em qualquer parte do projeto.
// Assim, conseguimos acessar o banco chamando: prisma.nomeDaTabela...
module.exports = { prisma };
