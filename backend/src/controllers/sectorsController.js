const { prisma } = require("../config/prismaClient"); // Conexão com o banco através do Prisma
const { parseAndValidateId } = require("../utils/validation"); // Função que valida IDs recebidos pela rota

// =====================================
// LISTAR TODOS OS SETORES
// =====================================
async function listSectors(req, res) {
  try {
    // Busca todos os setores no banco, ordenando pelo nome
    const sectors = await prisma.sector.findMany({
      orderBy: { name: "asc" }
    });

    res.json(sectors); // Retorna a lista para o cliente
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ error: "Error fetching sectors." });
  }
}

// =====================================
// BUSCAR UM SETOR PELO ID
// =====================================
async function getSectorById(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID recebido
  if (id === null) return; // Se o ID for inválido, já encerra

  try {
    // Busca o setor pelo ID e traz também os patrimônios associados
    const sector = await prisma.sector.findUnique({
      where: { id },
      include: { assets: true } // Traz a lista de ativos vinculados ao setor
    });

    if (!sector) {
      return res.status(404).json({ error: "Sector not found." });
    }

    res.json(sector); // Retorna o setor encontrado
  } catch (error) {
    console.error("Error fetching sector:", error);
    res.status(500).json({ error: "Error fetching sector." });
  }
}

// =====================================
// CRIAR UM NOVO SETOR
// =====================================
async function createSector(req, res) {
  try {
    const { name } = req.body; // Campo enviado pelo cliente

    // Verifica se o nome foi enviado corretamente
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }

    // Cria o setor no banco de dados
    const newSector = await prisma.sector.create({
      data: { name: name.trim() }
    });

    res.status(201).json(newSector); // Retorna o novo setor criado
  } catch (error) {
    console.error("Error creating sector:", error);
    res.status(500).json({ error: "Error creating sector." });
  }
}

// =====================================
// ATUALIZAR UM SETOR
// =====================================
async function updateSector(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID
  if (id === null) return;

  try {
    const { name } = req.body;

    // Valida o nome
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }

    // Verifica se o setor existe
    const sectorExists = await prisma.sector.findUnique({ where: { id } });
    if (!sectorExists) {
      return res.status(404).json({ error: "Sector not found." });
    }

    // Atualiza o setor no banco
    const updatedSector = await prisma.sector.update({
      where: { id },
      data: { name: name.trim() }
    });

    res.json(updatedSector); // Retorna o setor atualizado
  } catch (error) {
    console.error("Error updating sector:", error);
    res.status(500).json({ error: "Error updating sector." });
  }
}

// =====================================
// DELETAR UM SETOR
// =====================================
async function deleteSector(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID
  if (id === null) return;

  try {
    // Busca o setor e verifica se existem ativos vinculados
    const sector = await prisma.sector.findUnique({
      where: { id },
      include: { assets: true } // Traz os ativos do setor
    });

    if (!sector) {
      return res.status(404).json({ error: "Sector not found." });
    }

    // Se houver ativos vinculados, não permite excluir
    if (sector.assets.length > 0) {
      return res.status(400).json({
        error:
          "O setor não pode ser excluído porque existem ativos vinculados a ele."
      });
    }

    // Deleta o setor
    await prisma.sector.delete({ where: { id } });

    res.json({ message: "Sector deleted successfully." });
  } catch (error) {
    console.error("Error deleting sector:", error);
    res.status(500).json({ error: "Error deleting sector." });
  }
}

// Exporta todas as funções para uso nas rotas
module.exports = {
  listSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
};
