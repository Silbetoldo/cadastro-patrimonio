// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const { prisma } = require("../config/prismaClient");
const { generateToken } = require("../middlewares/authMiddleware");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'name', 'email' and 'password' are required." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash
      }
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already registered." });
    }

    return res.status(500).json({
      error: "Error registering user.",
      code: error.code,
      message: error.message,
      meta: error.meta
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Fields 'email' and 'password' are required." });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login." });
  }
}

module.exports = {
  register,
  login
};
