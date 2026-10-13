import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "dogzy-api", status: "healthy" });
});

app.get("/demo/marketplace", (_req, res) => {
  res.json({
    items: [
      { id: 1, name: "DOGZY Genesis #1", price: 0.35, rarity: "Common" },
      { id: 2, name: "DOGZY Genesis #2", price: 0.55, rarity: "Rare" },
      { id: 3, name: "DOGZY Genesis #3", price: 1.8, rarity: "Legendary" }
    ]
  });
});

app.listen(port, () => {
  console.log(`DOGZY API listening on http://localhost:${port}`);
});
