require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

app.use(express.json());

const NFTrouter = require("./routers/NFT");
const DedupRouter = require("./routers/Dedup");


app.use(NFTrouter);
app.use(DedupRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
