const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /api/notes - Lấy toàn bộ ghi chú, sắp xếp theo createdAt mới nhất lên đầu
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách ghi chú", error: error.message });
  }
});

// POST /api/notes - Tạo ghi chú mới
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Tiêu đề không được để trống" });
    }

    const newNote = new Note({
      title: title.trim(),
      content: content ? content.trim() : "",
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi tạo ghi chú mới", error: error.message });
  }
});

module.exports = router;
