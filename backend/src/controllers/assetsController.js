// src/controllers/assetsController.js
const { prisma } = require("../config/prismaClient");
const { parseAndValidateId } = require("../utils/validation");

async function listAssets(req, res) {
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
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Error fetching assets." });
  }
}

async function getAssetById(req, res) {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: { sector: true }
    });

    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

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

async function createAsset(req, res) {
  try {
    let { name, assetNumber, sectorId } = req.body;

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

    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
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
    console.error("Error creating asset:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error creating asset." });
  }
}

async function updateAsset(req, res) {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    let { name, assetNumber, sectorId } = req.body;

    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

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

    sectorId = Number(sectorId);
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Field 'sectorId' must be a valid integer."
      });
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
    console.error("Error updating asset:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Asset number must be unique." });
    }

    res.status(500).json({ error: "Error updating asset." });
  }
}

async function deleteAsset(req, res) {
  const id = parseAndValidateId(req.params.id, res);
  if (id === null) return;

  try {
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    await prisma.asset.delete({ where: { id } });

    res.json({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Error deleting asset." });
  }
}

module.exports = {
  listAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
};
