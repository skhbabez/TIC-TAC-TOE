import type { BoardState } from "./types";

export const createTiles = () => {
  return Array.from({ length: 9 }, () => null);
};

export const getEmptyTiles = (tiles: BoardState) => {
  return tiles
    .map((marker, idx) => (!marker ? idx : -1))
    .filter((idx) => idx >= 0);
};
