import { useReducer } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";

export type Marker = "x" | "o";

export interface Tile {
  id: number;
  marker: Marker | null;
}
export interface Score {
  playerX: number;
  ties: number;
  playerO: number;
}

interface GameState {
  status: "running" | "idle";
  marker: Marker;
  vsCpu: boolean;
  tiles: Tile[];
  turn: Marker;
  score: Score;
}

interface StartAction {
  type: "START";
  vsCpu: boolean;
}

interface MarkerAction {
  type: "MARKER";
  marker: Marker;
}

interface TickAction {
  type: "TICK";
  id: number;
}

interface RestartAction {
  type: "RESTART";
}

type GameAction = StartAction | MarkerAction | TickAction | RestartAction;

const defaultGameState: GameState = {
  status: "idle",
  vsCpu: true,
  marker: "x",
  tiles: Array.from({ length: 9 }, (_, i) => ({ id: i, marker: null })),
  turn: "x",
  score: {
    playerX: 0,
    ties: 0,
    playerO: 0,
  },
};
const reducer = (gameState: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START":
      return {
        ...gameState,
        status: "running",
        vsCpu: action.vsCpu,
      };
    case "MARKER":
      return {
        ...gameState,
        marker: action.marker,
      };
    case "TICK": {
      const tickedId = action.id;
      const turn = gameState.turn == "x" ? "o" : "x";
      const tiles = [...gameState.tiles];
      const idx = tiles.findIndex(({ id }) => id == tickedId);
      tiles[idx]["marker"] = gameState.turn;
      return {
        ...gameState,
        tiles,
        turn,
      };
    }
    case "RESTART":
      return {
        ...gameState,
        turn: gameState.marker,
        score: {
          playerX: 0,
          ties: 0,
          playerO: 0,
        },
        tiles: Array.from({ length: 9 }, (_, i) => ({ id: i, marker: null })),
      };
    default:
      return gameState;
  }
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, defaultGameState);
  return (
    <main>
      {gameState.status === "idle" ? (
        <NewGame
          marker={gameState.marker}
          onMarkerChange={(marker) =>
            dispatch({ type: "MARKER", marker: marker })
          }
          startGame={(vsCpu) => dispatch({ type: "START", vsCpu: vsCpu })}
        />
      ) : (
        <ActiveGame
          marker={gameState.marker}
          vsCpu={gameState.vsCpu}
          tiles={gameState.tiles}
          turn={gameState.turn}
          score={gameState.score}
          onTick={(id) => dispatch({ type: "TICK", id })}
          restart={() => dispatch({ type: "RESTART" })}
        />
      )}
    </main>
  );
}

export default App;
