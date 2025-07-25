import express from "express";
import { generatePuzzle } from "./lib/puzzle/generator";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Queens API!");
});

app.get("/generate", (req, res) => {
  const size = parseInt(req.query.size as string) || 10;
  const puzzle = generatePuzzle(size);

  res.send(JSON.stringify(puzzle));
});

export default app;
