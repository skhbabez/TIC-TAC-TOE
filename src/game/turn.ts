import type { BoardState, Marker } from "./types";
import { getEmptyTiles } from "./utils";

export const hasWon = (tiles: (Marker | null)[]) => {
  for (let i = 0; i < 3; i++) {
    if (
      tiles[i] &&
      tiles[i] === tiles[i + 3] &&
      tiles[i + 3] === tiles[i + 6]
    ) {
      return tiles[i];
    }

    if (
      tiles[i * 3] &&
      tiles[i * 3] === tiles[i * 3 + 1] &&
      tiles[i * 3 + 1] === tiles[i * 3 + 2]
    ) {
      return tiles[i * 3];
    }
  }

  if (tiles[0] && tiles[0] === tiles[4] && tiles[4] === tiles[8]) {
    return tiles[4];
  }

  if (tiles[2] && tiles[2] === tiles[4] && tiles[4] === tiles[6]) {
    return tiles[4];
  }

  if (tiles.filter((tile) => !tile).length === 0) {
    return "tie";
  }

  return null;
};

const minimax = (
  maxPlayer: Marker,
  curPlayer: Marker,
  tiles: BoardState,
  depth: number = 0
): number => {
  const result = hasWon(tiles);
  const minPlayer = maxPlayer === "x" ? "o" : "x";
  const nextPlayer = curPlayer === "x" ? "o" : "x";
  if (result === maxPlayer) {
    // return 10 - depth;
    return 10;
  } else if (result === minPlayer) {
    return -10;
  } else if (result === "tie") {
    return 0;
  }
  // depth += 1;
  const emptyTiles = getEmptyTiles(tiles);
  if (curPlayer === maxPlayer) {
    let max = -Infinity;
    for (const idx of emptyTiles) {
      if (tiles[idx] === null) {
        const newTiles = [...tiles];
        newTiles[idx] = curPlayer;
        max = Math.max(minimax(maxPlayer, nextPlayer, newTiles), max, depth);
      }
    }
    return max;
  } else {
    let min = Infinity;
    for (const idx of emptyTiles) {
      if (tiles[idx] === null) {
        const newTiles = [...tiles];
        newTiles[idx] = curPlayer;
        min = Math.min(minimax(maxPlayer, nextPlayer, newTiles), min, depth);
      }
    }
    return min;
  }
};

export const cpuTurn = (tiles: BoardState, curPlayer: Marker) => {
  const emptyTiles = getEmptyTiles(tiles);
  if (emptyTiles.length === 0) {
    return -1;
  }
  if (emptyTiles.length === 1) {
    return emptyTiles[0];
  }
  const results = new Array(9).fill(-Infinity);
  const nextPlayer = curPlayer === "x" ? "o" : "x";

  for (const idx of emptyTiles) {
    const newTiles = [...tiles];
    newTiles[idx] = curPlayer;
    results[idx] = minimax(curPlayer, nextPlayer, newTiles);
  }

  const max = Math.max(...results);
  const indices = results
    .map((result, idx) => (result === max ? idx : -1))
    .filter((idx) => idx >= 0);
  return indices[Math.floor(Math.random() * indices.length)];
};
