import { useReducer } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";

export type Marker = "x" | "o";

interface GameState {
  status: "running" | "idle";
  marker: Marker;
  vsCpu: boolean;
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
  const [gameState, dispatch] = useReducer(reducer, {
    status: "idle",
    vsCpu: true,
    marker: "x",
  });
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
        <ActiveGame marker={gameState.marker} vsCpu={gameState.vsCpu} />
      )}
    </main>
  );
}

export default App;
