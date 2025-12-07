// src/controllers/sectorsController.js
const { prisma } = require("../config/prismaClient");
const { parseAndValidateId } = require("../utils/validation");

async function listSectors(req, res) {
  try {
    const sectors = await prisma.sector.findMany({
      orderBy: { name: "asc" }
    });
    res.json(sectors);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ error: "Error fetching sectors." });
  }
}

async function getSectorById(req, res) {
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
}

async function createSector(req, res) {
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
}

async function updateSector(req, res) {
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
}

async function deleteSector(req, res) {
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
          "O setor não pode ser excluído porque existem ativos vinculados a ele."
      });
    }

    await prisma.sector.delete({ where: { id } });

    res.json({ message: "Sector deleted successfully." });
  } catch (error) {
    console.error("Error deleting sector:", error);
    res.status(500).json({ error: "Error deleting sector." });
  }
}

module.exports = {
  listSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
};
