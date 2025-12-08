const express = require("express"); // Importa o Express para criar as rotas
const assetsController = require("../controllers/assetsController"); // Importa o controller de patrimônio

const router = express.Router(); // Cria um roteador para organizar as rotas desta funcionalidade

// Rota para listar todos os patrimônios cadastrados
router.get("/", assetsController.listAssets);

// Rota para buscar um patrimônio específico pelo ID
router.get("/:id", assetsController.getAssetById);

// Rota para criar um novo patrimônio
router.post("/", assetsController.createAsset);

// Rota para atualizar um patrimônio já existente usando o ID
router.put("/:id", assetsController.updateAsset);

// Rota para deletar um patrimônio pelo ID
router.delete("/:id", assetsController.deleteAsset);

// Exporta o router para ser usado no servidor principal
module.exports = router;
