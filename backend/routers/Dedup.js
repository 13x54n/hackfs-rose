const express = require("express");
const fs = require("fs").promises; // Using fs.promises for async file operations
const path = require("path");
const ipfsOnlyHash = require("ipfs-only-hash");
const multer = require("multer");
const dedupRouter = express.Router();

const uploadDir = path.join(__dirname, "../public", "uploads");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

dedupRouter.post("/dedup", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = req.file;
    const fileBuffer = await fs.readFile(uploadedFile.path);
    const cid = await ipfsOnlyHash.of(fileBuffer);

    // send cid to blockchain and check

    res.json({ cid });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = dedupRouter;
