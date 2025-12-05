// src/server.js
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API - Cadastro de Patrimônio (SENAI)" });
});

/**
 * SETORES
 */
app.get("/sectors", async (req, res) => {
  try {
    const sectors = await prisma.sector.findMany({
      orderBy: { name: "asc" }
    });
    res.json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sectors." });
  }
});

app.post("/sectors", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }

    const newSector = await prisma.sector.create({
      data: { name: name.trim() }
    });

    res.status(201).json(newSector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating sector." });
  }
});

app.put("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (!name || name.trim() === "") {
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
    console.error(error);
    res.status(500).json({ error: "Error updating sector." });
  }
});

app.delete("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const sector = await prisma.sector.findUnique({
      where: { id },
      include: { assets: true }
    });

    if (!sector) {
      return res.status(404).json({ error: "Sector not found." });
    }

    if (sector.assets.length > 0) {
      return res.status(400).json({
        error: "Sector cannot be deleted because there are assets linked to it."
      });
    }

    await prisma.sector.delete({ where: { id } });

    res.json({ message: "Sector deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting sector." });
  }
});

/**
 * PATRIMÔNIOS
 */
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
    console.error(error);
    res.status(500).json({ error: "Error fetching assets." });
  }
});

app.post("/assets", async (req, res) => {
  try {
    const { name, assetNumber, sectorId } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }
    if (!assetNumber || assetNumber.trim() === "") {
      return res
        .status(400)
        .json({ error: "Field 'assetNumber' is required." });
    }
    if (!sectorId) {
      return res
        .status(400)
        .json({ error: "Field 'sectorId' is required." });
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
    console.error(error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error creating asset." });
  }
});

app.put("/assets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, assetNumber, sectorId } = req.body;

    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Field 'name' is required." });
    }
    if (!assetNumber || assetNumber.trim() === "") {
      return res
        .status(400)
        .json({ error: "Field 'assetNumber' is required." });
    }
    if (!sectorId) {
      return res
        .status(400)
        .json({ error: "Field 'sectorId' is required." });
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
    console.error(error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error updating asset." });
  }
});

app.delete("/assets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    await prisma.asset.delete({ where: { id } });

    res.json({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting asset." });
  }
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
