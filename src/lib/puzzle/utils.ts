export const shuffleArray = <T>(array: T[]): T[] =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
