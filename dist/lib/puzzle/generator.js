"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHiveBlocks = exports.generateQueenPositions = exports.generatePuzzle = void 0;
const colors_1 = require("../../constants/colors");
const utils_1 = require("./utils");
const generatePuzzle = (size) => {
    const puzzle = {
        id: crypto.randomUUID(),
        size,
        hives: [],
        createdAt: new Date(),
    };
    const queens = (0, exports.generateQueenPositions)(size);
    const colorKeys = Object.keys(colors_1.colors);
    const shuffledColors = colorKeys.sort(() => Math.random() - 0.5);
    queens.forEach((queen, idx) => {
        const hive = {
            queen: queen,
            color: shuffledColors[idx % shuffledColors.length],
            blocks: [],
        };
        puzzle.hives.push(hive);
    });
    const hives = (0, exports.generateHiveBlocks)(puzzle);
    puzzle.hives = hives;
    return puzzle;
};
exports.generatePuzzle = generatePuzzle;
const generateQueenPositions = (size) => {
    const queenPositions = [];
    const cols = new Set();
    const diag1 = new Set(); // x - y
    const diag2 = new Set(); // x + y
    const backtrack = (row) => {
        if (row === size)
            return true;
        const colsAvailable = [...Array(size).keys()].sort(() => Math.random() - 0.5);
        for (const col of colsAvailable) {
            const d1 = col - row;
            const d2 = col + row;
            if (cols.has(col) || diag1.has(d1) || diag2.has(d2))
                continue;
            queenPositions.push([col, row]);
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);
            if (backtrack(row + 1))
                return true;
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
exports.generateQueenPositions = generateQueenPositions;
const getNeighbors = (r, c, size) => {
    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    return dirs
        .map(([dr, dc]) => [r + dr, c + dc])
        .filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size);
};
const generateHiveBlocks = (puzzle) => {
    const { size, hives } = puzzle;
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    const totalCells = size * size;
    const claimed = new Set();
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
        const idx = (0, utils_1.getRandomInt)(0, hives.length);
        territorySizes[idx]++;
        remaining--;
    }
    for (let i = 0; i < hives.length; i++) {
        const hive = hives[i];
        const desired = territorySizes[i];
        const frontier = [hive.queen];
        const visited = new Set();
        visited.add(`${hive.queen[0]},${hive.queen[1]}`);
        while (hive.blocks.length < desired && frontier.length > 0) {
            (0, utils_1.shuffleArray)(frontier);
            const [r, c] = frontier.pop();
            const neighbors = getNeighbors(r, c, size);
            (0, utils_1.shuffleArray)(neighbors);
            for (const [nr, nc] of neighbors) {
                const key = `${nr},${nc}`;
                if (!claimed.has(key)) {
                    board[nr][nc] = hive.color;
                    hive.blocks.push([nr, nc]);
                    claimed.add(key);
                    frontier.push([nr, nc]);
                    visited.add(key);
                    if (hive.blocks.length >= desired)
                        break;
                }
            }
        }
    }
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const key = `${r},${c}`;
            if (claimed.has(key))
                continue;
            const neighbors = getNeighbors(r, c, size);
            const candidates = [];
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
            const assignedHive = candidates[(0, utils_1.getRandomInt)(0, candidates.length)];
            assignedHive.blocks.push([r, c]);
            board[r][c] = assignedHive.color;
            claimed.add(key);
        }
    }
    return hives;
};
exports.generateHiveBlocks = generateHiveBlocks;
