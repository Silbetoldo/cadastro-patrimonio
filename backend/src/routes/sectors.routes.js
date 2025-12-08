const express = require("express"); // Importa o Express para criar rotas
const sectorsController = require("../controllers/sectorsController"); // Controller responsável por lidar com os setores

const router = express.Router(); // Cria um roteador específico para as rotas de setores

// Rota para listar todos os setores cadastrados
router.get("/", sectorsController.listSectors);

// Rota para buscar um setor específico pelo ID
router.get("/:id", sectorsController.getSectorById);

// Rota para criar um novo setor
router.post("/", sectorsController.createSector);

// Rota para editar um setor já existente
router.put("/:id", sectorsController.updateSector);

// Rota para deletar um setor pelo ID
router.delete("/:id", sectorsController.deleteSector);

// Exporta o router para ser usado no servidor principal
module.exports = router;
