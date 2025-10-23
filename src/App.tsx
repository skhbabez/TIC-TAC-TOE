import { useReducer, useState } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";
import Dialog from "./components/Dialog/Dialog";
import Button from "./components/Button/Button";

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
  status: "running" | "idle" | "finished";
  result: "x" | "o" | "tie" | null;
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
  result: null,
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
      const idx = gameState.tiles.findIndex(({ id }) => id === tickedId);
      const tile = gameState.tiles[idx];
      if (tile.marker !== null) {
        return gameState;
      }
      const tiles = gameState.tiles.map((tile) => ({ ...tile }));
      const turn = gameState.turn === "x" ? "o" : "x";
      tiles[idx].marker = gameState.turn;
      const isTie = tiles.filter((tile) => tile.marker).length >= 9;
      return {
        ...gameState,
        status: isTie ? "finished" : gameState.status,
        result: isTie ? "tie" : gameState.result,
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
  const [showRestart, setShowRestart] = useState(false);
  // const restartRef = useRef<HTMLDialogElement>(null);
  // const tieRef = useRef<HTMLDialogElement>(null);
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
          onRestart={() => setShowRestart(true)}
        />
      )}
      <Dialog show={showRestart}>
        <div className="mt-[3.8125rem] md:mt-[4.1875rem] mx-auto w-fit">
          <h1 className="text-center text-heading-m md:text-heading-l text-silver">
            restart game?
          </h1>
          <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
            <Button
              variant="secondary"
              color="silver"
              onClick={() => setShowRestart(false)}
            >
              no, cancel
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "RESTART" });
                setShowRestart(false);
              }}
              variant="secondary"
              color="yellow"
            >
              yes, restart
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog show={gameState.result === "tie"}>
        <div className="mt-[3.8125rem] md:mt-[4.1875rem] mx-auto w-fit">
          <h1 className="text-center text-heading-m md:text-heading-l text-silver">
            round tied
          </h1>
          <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
            <Button
              variant="secondary"
              color="silver"
              onClick={() => console.log("quit")}
            >
              quit
            </Button>
            <Button
              onClick={() => {
                console.log("next round");
              }}
              variant="secondary"
              color="yellow"
            >
              next round
            </Button>
          </div>
        </div>
      </Dialog>
    </main>
  );
}

export default App;

//  <Dialog ref={restartRef}>
//         <div className="mt-[3.8125rem] md:mt-[4.1875rem] mx-auto w-fit">
//           <h1 className="text-center text-heading-m md:text-heading-l text-silver">
//             restart game?
//           </h1>
//           <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
//             <Button
//               variant="secondary"
//               color="silver"
//               onClick={() => restartRef.current?.close()}
//             >
//               no, cancel
//             </Button>
//             <Button
//               onClick={() => {
//                 restart();
//                 restartRef.current?.close();
//               }}
//               variant="secondary"
//               color="yellow"
//             >
//               yes, restart
//             </Button>
//           </div>
//         </div>
//       </Dialog>
