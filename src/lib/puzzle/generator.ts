import { Color, colors } from "../../constants/colors";
import { Block, Hive, Puzzle } from "../../models/puzzle";

type Layout = Block[];

export const generatePuzzle = (size: number): Puzzle => {
  const puzzle: Puzzle = {
    id: crypto.randomUUID(),
    size,
    hive: [],
    createdAt: new Date(),
  };

  const queens = generateQueenPositions(size);
  const colorKeys = Object.keys(colors) as Color[];
  const shuffledColors = colorKeys.sort(() => Math.random() - 0.5);

  queens.forEach((queen, idx) => {
    const hive: Hive = {
      queen: queen,
      color: shuffledColors[idx % shuffledColors.length],
      blocks: [],
    };

    puzzle.hive.push(hive);
  });

  return puzzle;
};

export const generateQueenPositions = (size: number): Layout => {
  const queenPositions: Layout = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // x - y
  const diag2 = new Set<number>(); // x + y

  const backtrack = (row: number): boolean => {
    if (row === size) return true;

    const colsAvailable = [...Array(size).keys()].sort(
      () => Math.random() - 0.5
    );

    for (const col of colsAvailable) {
      const d1 = col - row;
      const d2 = col + row;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      queenPositions.push([col, row]);
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      if (backtrack(row + 1)) return true;

      queenPositions.pop();
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }

    return false;
  };

  backtrack(0);

  return queenPositions;
};
