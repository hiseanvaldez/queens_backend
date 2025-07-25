import { Color } from "../constants/colors";

export type Block = [number, number];
export interface Puzzle {
  id: string;
  size: number;
  hive: Hive[];
  createdAt: Date;
}

export interface Hive {
  color: Color;
  blocks: Block[];
  queen: Block;
}
