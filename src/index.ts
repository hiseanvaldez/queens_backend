import express from "express";
import { generatePuzzle, generateQueenPositions } from "./lib/puzzle/generator";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  const size = parseInt(req.query.size as string) || 10;
  const puzzle = generatePuzzle(size);

  res.send(JSON.stringify(puzzle));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Now listening on all network interfaces, baby 😘");
});
