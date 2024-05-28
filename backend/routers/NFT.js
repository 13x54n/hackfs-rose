const express = require("express");
const path = require("path");
const fs = require("fs");
const lighthouse = require("@lighthouse-web3/sdk");

const NFTrouter = express.Router();

NFTrouter.post("/mint", async (req, res) => {
  const { metadata } = req.body;

  // Generate a unique file name based on the current timestamp
  const timestamp = Date.now();
  const fileName = `${timestamp}.json`;
  const filePath = path.join(__dirname, "../public", "metadata", fileName);

  try {
    // Write metadata to file
    await fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), "utf8");

    const uploadResponse = await lighthouse.upload(
      filePath,
      process.env.LIGHTHOUSE_API_KEY
    );

    res.status(200).json({ uploadResponse });
  } catch (error) {
    console.error("Oops something went wrong:", error);
    res.status(500).json({ error });
  }
});

module.exports = NFTrouter;
