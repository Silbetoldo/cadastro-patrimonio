const { prisma } = require("../config/prismaClient"); // Importa o cliente Prisma para acessar o banco de dados
const { parseAndValidateId } = require("../utils/validation"); // Função que valida IDs recebidos na rota

// =====================================
// LISTAR TODOS OS PATRIMÔNIOS
// =====================================
async function listAssets(req, res) {
  try {
    // Busca todos os patrimônios no banco, trazendo o setor relacionado
    const assets = await prisma.asset.findMany({
      include: { sector: true },         // Traz os dados do setor também
      orderBy: { createdAt: "desc" }     // Ordena do mais novo para o mais antigo
    });

    // Mapeia os dados para enviar apenas o necessário ao front-end
    const mapped = assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      assetNumber: asset.assetNumber,
      sectorId: asset.sectorId,
      sectorName: asset.sector?.name ?? null, // Verifica se o setor existe
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));

    res.json(mapped); // Retorna o array para o cliente
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Error fetching assets." });
  }
}

// =====================================
// BUSCAR UM PATRIMÔNIO PELO ID
// =====================================
async function getAssetById(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID recebido
  if (id === null) return; // Se inválido, a função já respondeu o erro

  try {
    // Busca patrimônio pelo ID
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: { sector: true }
    });

    // Se não encontrou, retorna erro 404
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    // Retorna o patrimônio encontrado
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
}

// =====================================
// CRIAR UM NOVO PATRIMÔNIO
// =====================================
async function createAsset(req, res) {
  try {
    let { name, assetNumber, sectorId } = req.body;

    // Validações simples do backend (campos obrigatórios)
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

    // Valida o sectorId
    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
    }

    // Verifica se o setor existe antes de criar o patrimônio
    const sectorExists = await prisma.sector.findUnique({
      where: { id: sectorId }
    });
    if (!sectorExists) {
      return res.status(400).json({ error: "Sector does not exist." });
    }

    // Cria o novo patrimônio no banco
    const newAsset = await prisma.asset.create({
      data: {
        name: name.trim(),
        assetNumber: assetNumber.trim(),
        sectorId
      }
    });

    res.status(201).json(newAsset); // Retorna sucesso com código 201
  } catch (error) {
    console.error("Error creating asset:", error);

    // Erro do Prisma para valor único duplicado
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "O número de identificação do ativo deve ser único." });
    }

    res.status(500).json({ error: "Error creating asset." });
  }
}

// =====================================
// ATUALIZAR UM PATRIMÔNIO
// =====================================
async function updateAsset(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID
  if (id === null) return;

  try {
    let { name, assetNumber, sectorId } = req.body;

    // Verifica se o patrimônio existe antes de atualizar
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    // Mesmas validações de criação
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

    // Valida setor
    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
    }

    // Verifica se o setor existe
    const sectorExists = await prisma.sector.findUnique({
      where: { id: sectorId }
    });
    if (!sectorExists) {
      return res.status(400).json({ error: "Sector does not exist." });
    }

    // Atualiza o patrimônio no banco
    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: {
        name: name.trim(),
        assetNumber: assetNumber.trim(),
        sectorId
      }
    });

    res.json(updatedAsset); // Retorna o patrimônio atualizado
  } catch (error) {
    console.error("Error updating asset:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "O número de identificação do ativo deve ser único." });
    }

    res.status(500).json({ error: "Error updating asset." });
  }
}

// =====================================
// DELETAR UM PATRIMÔNIO
// =====================================
async function deleteAsset(req, res) {
  const id = parseAndValidateId(req.params.id, res); // Valida ID
  if (id === null) return;

  try {
    // Verifica se o patrimônio existe antes de deletar
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    // Deleta do banco
    await prisma.asset.delete({ where: { id } });

    res.json({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Error deleting asset." });
  }
}

// Exporta todas as funções para uso nas rotas
module.exports = {
  listAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
};
