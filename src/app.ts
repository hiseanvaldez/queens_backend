import express from "express";
import cors from "cors";

import { generatePuzzle } from "./lib/puzzle/generator";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to Queens API!");
});

app.get("/generate", (req, res) => {
  const size = parseInt(req.query.size as string) || 10;
  const puzzle = generatePuzzle(size);

  res.send(JSON.stringify(puzzle));
});

export default app;
