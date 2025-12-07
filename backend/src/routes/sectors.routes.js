const express = require("express");
const sectorsController = require("../controllers/sectorsController");

const router = express.Router();

router.get("/", sectorsController.listSectors);
router.get("/:id", sectorsController.getSectorById);
router.post("/", sectorsController.createSector);
router.put("/:id", sectorsController.updateSector);
router.delete("/:id", sectorsController.deleteSector);

module.exports = router;
