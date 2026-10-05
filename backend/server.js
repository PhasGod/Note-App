const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/note_app";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Root route check
app.get("/", (req, res) => {
  res.send("Note App API Server đang hoạt động!");
});

// Kết nối MongoDB và khởi động Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("-> Kết nối MongoDB thành công!");
    app.listen(PORT, () => {
      console.log(`-> Server đang chạy tại: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("-> Lỗi kết nối MongoDB:", err.message);
  });
