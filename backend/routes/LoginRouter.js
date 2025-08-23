const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user by username
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    // 3. Create JWT token
    const payload = {
      id: user.id,
      username: user.username,
      firstName: user.FirstName,
      lastName: user.LastName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // token expires in 1 hour
    });

    // 4. Send token to client
    res.json({
      message: "Login successful!",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// SIGN-IN
router.post("/sign-up", async (req, res) => {
  const { username, password, FirstName, LastName, email } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({ where: { username } });
    if (existingUser) return res.status(400).send("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        FirstName,
        LastName,
        email,
      },
    });

    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
