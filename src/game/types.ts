export type Marker = "x" | "o";

export type BoardState = (Marker | null)[];

export interface Score {
  playerX: number;
  ties: number;
  playerO: number;
}

export interface GameState {
  status: "running" | "idle";
  result: "x" | "o" | "tie" | null;
  round: number;
  marker: Marker;
  vsCpu: boolean;
  tiles: (Marker | null)[];
  turn: Marker;
  score: Score;
}
