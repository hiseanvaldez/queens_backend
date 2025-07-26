import { Color, colors } from "../../constants/colors";
import { Block, Hive, Puzzle } from "../../models/puzzle";
import { getRandomInt, shuffleArray } from "./utils";

type Layout = Block[];

export const generatePuzzle = (size: number): Puzzle => {
  const puzzle: Puzzle = {
    id: crypto.randomUUID(),
    size,
    hives: [],
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

    puzzle.hives.push(hive);
  });

  const hives = generateHiveBlocks(puzzle);
  puzzle.hives = hives;

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

const getNeighbors = (
  r: number,
  c: number,
  size: number
): [number, number][] => {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  return dirs
    .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
    .filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size);
};

export const generateHiveBlocks = (puzzle: Puzzle): Hive[] => {
  const { size, hives } = puzzle;

  const board: (string | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );

  const totalCells = size * size;
  const claimed: Set<string> = new Set();

  for (const hive of hives) {
    const [r, c] = hive.queen;
    const key = `${r},${c}`;
    board[r][c] = hive.color;
    hive.blocks = [[r, c]];
    claimed.add(key);
  }

  let remaining = totalCells - hives.length;
  const territorySizes = Array(hives.length).fill(1);
  remaining -= hives.length;

  while (remaining > 0) {
    const idx = getRandomInt(0, hives.length);
    territorySizes[idx]++;
    remaining--;
  }

  for (let i = 0; i < hives.length; i++) {
    const hive = hives[i];
    const desired = territorySizes[i];

    const frontier: [number, number][] = [hive.queen];
    const visited: Set<string> = new Set();
    visited.add(`${hive.queen[0]},${hive.queen[1]}`);

    while (hive.blocks.length < desired && frontier.length > 0) {
      shuffleArray(frontier);
      const [r, c] = frontier.pop()!;

      const neighbors = getNeighbors(r, c, size);
      shuffleArray(neighbors);

      for (const [nr, nc] of neighbors) {
        const key = `${nr},${nc}`;
        if (!claimed.has(key)) {
          board[nr][nc] = hive.color;
          hive.blocks.push([nr, nc]);
          claimed.add(key);
          frontier.push([nr, nc]);
          visited.add(key);
          if (hive.blocks.length >= desired) break;
        }
      }
    }
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const key = `${r},${c}`;
      if (claimed.has(key)) continue;

      const neighbors = getNeighbors(r, c, size);
      const candidates: Hive[] = [];

      for (const [nr, nc] of neighbors) {
        const neighborKey = `${nr},${nc}`;
        if (claimed.has(neighborKey)) {
          for (const hive of hives) {
            if (hive.blocks.some(([br, bc]) => br === nr && bc === nc)) {
              candidates.push(hive);
              break;
            }
          }
        }
      }

      if (candidates.length === 0) {
        continue;
      }

      const assignedHive = candidates[getRandomInt(0, candidates.length)];
      assignedHive.blocks.push([r, c]);
      board[r][c] = assignedHive.color;
      claimed.add(key);
    }
  }

  return hives;
};
