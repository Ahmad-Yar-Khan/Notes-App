//send existing notes to frontend
const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prisma");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id }, // ✅ only fetch logged-in user's notes
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

//add a new note
router.post("/", authMiddleware, async (req, res) => {
  const { title, noteText } = req.body;
  try {
    const newNote = await prisma.note.create({
      data: {
        title: title,
        noteText: noteText,
        userId: req.user.id,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.log("error while updating database", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

module.exports = router;
