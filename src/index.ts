import express from "express";
import { generatePuzzle, generateQueenPositions } from "./lib/puzzle/generator";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  const puzzle = generatePuzzle(8); // Example usage of the function

  res.send(JSON.stringify(puzzle));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Now listening on all network interfaces, baby 😘");
});
