"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = exports.shuffleArray = void 0;
const shuffleArray = (array) => array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
exports.shuffleArray = shuffleArray;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
exports.getRandomInt = getRandomInt;
