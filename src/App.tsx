import { useReducer } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";

export type Marker = "x" | "o";

export interface Tile {
  id: number;
  marker: Marker | null;
}

interface GameState {
  status: "running" | "idle";
  marker: Marker;
  vsCpu: boolean;
  tiles: Tile[];
}

interface StartAction {
  type: "START";
  vsCpu: boolean;
}

interface MarkerAction {
  type: "MARKER";
  marker: Marker;
}

type GameAction = StartAction | MarkerAction;

const defaultGameState: GameState = {
  status: "idle",
  vsCpu: true,
  marker: "x",
  tiles: Array.from({ length: 9 }, (_, i) => ({ id: i, marker: null })),
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
        />
      )}
    </main>
  );
}

export default App;
