"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generator_1 = require("./lib/puzzle/generator");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    const size = parseInt(req.query.size) || 10;
    const puzzle = (0, generator_1.generatePuzzle)(size);
    res.send(JSON.stringify(puzzle));
});
exports.default = app;
