import { useEffect, useReducer, useState } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";
import Dialog from "./components/Dialog/Dialog";
import Button from "./components/Button/Button";
import X from "./components/icons/X";
import O from "./components/icons/O";
import clsx from "clsx";

export type Marker = "x" | "o";

// export interface Tile {
//   id: number;
//   marker: Marker | null;
// }
export interface Score {
  playerX: number;
  ties: number;
  playerO: number;
}

interface GameState {
  status: "running" | "idle";
  result: "x" | "o" | "tie" | null;
  round: number;
  marker: Marker;
  vsCpu: boolean;
  tiles: (Marker | null)[];
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
  idx: number;
}

interface RestartAction {
  type: "RESTART";
}

interface QuitAction {
  type: "QUIT";
}

interface NextRoundAction {
  type: "NEXTROUND";
}

type GameAction =
  | StartAction
  | MarkerAction
  | TickAction
  | RestartAction
  | QuitAction
  | NextRoundAction;

const createTiles = () => {
  return Array.from({ length: 9 }, () => null);
};

const defaultGameState: GameState = {
  status: "idle",
  result: null,
  round: 0,
  vsCpu: true,
  marker: "x",
  tiles: createTiles(),
  turn: "x",
  score: {
    playerX: 0,
    ties: 0,
    playerO: 0,
  },
};

const hasWon = (tiles: (Marker | null)[]) => {
  for (let i = 0; i < 3; i++) {
    // columns
    if (
      tiles[i] &&
      tiles[i] === tiles[i + 3] &&
      tiles[i + 3] === tiles[i + 6]
    ) {
      console.log("test");

      return tiles[i];
    }

    // rows
    if (
      tiles[i * 3] &&
      tiles[i * 3] === tiles[i * 3 + 1] &&
      tiles[i * 3 + 1] === tiles[i * 3 + 2]
    ) {
      return tiles[i * 3];
    }
  }

  // diagonal
  if (tiles[0] && tiles[0] === tiles[4] && tiles[4] === tiles[8]) {
    return tiles[4];
  }

  if (tiles[2] && tiles[2] === tiles[4] && tiles[4] === tiles[6]) {
    return tiles[4];
  }

  // tie
  if (tiles.filter((tile) => !tile).length === 0) {
    return "tie";
  }
  // undecided
  return null;
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
      // check if we alreday selected the tile
      const idx = action.idx;
      const tile = gameState.tiles[idx];
      if (tile !== null) {
        return gameState;
      }
      const tiles = [...gameState.tiles];
      const turn = gameState.turn === "x" ? "o" : "x";
      tiles[idx] = gameState.turn;
      const result = hasWon(tiles);
      return {
        ...gameState,
        result: result,
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
        tiles: createTiles(),
      };
    case "QUIT":
      return {
        status: "idle",
        round: 0,
        result: null,
        vsCpu: true,
        marker: "x",
        tiles: createTiles(),
        turn: "x",
        score: {
          playerX: 0,
          ties: 0,
          playerO: 0,
        },
      };
    case "NEXTROUND": {
      const nextRound = gameState.round + 1;
      return {
        ...gameState,
        status: "running",
        result: null,
        tiles: createTiles(),
        round: nextRound,
        turn: nextRound % 2 == 0 ? "x" : "o",
        score: {
          playerX:
            gameState.result == "x"
              ? gameState.score.playerX + 1
              : gameState.score.playerX,
          ties:
            gameState.result == "tie"
              ? gameState.score.ties + 1
              : gameState.score.ties,
          playerO:
            gameState.result == "o"
              ? gameState.score.playerO + 1
              : gameState.score.playerO,
        },
      };
    }
    default:
      return gameState;
  }
};

const cpuTurn = (tiles: (Marker | null)[]) => {
  const emptyIdx = tiles
    .map((marker, idx) => (!marker ? idx : -1))
    .filter((idx) => idx >= 0);
  const choice = Math.floor(Math.random() * emptyIdx.length);
  return emptyIdx[choice];
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, defaultGameState);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    if (gameState.vsCpu && gameState.status === "running") {
      const cpuMarker = gameState.marker === "x" ? "o" : "x";
      if (gameState.turn === cpuMarker) {
        dispatch({ type: "TICK", idx: cpuTurn(gameState.tiles) });
      }
    }
  }, [gameState]);

  const dialogText = () => {
    if (gameState.vsCpu) {
      if (gameState.marker === gameState.result) {
        return "you won!";
      } else {
        return "oh no, you lost…";
      }
    } else {
      if (gameState.result === "x") {
        return "player 1 wins!";
      } else {
        return "player 2 wins!";
      }
    }
  };

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
          onTick={(idx) => dispatch({ type: "TICK", idx })}
          onRestart={() => {
            setShowRestart(true);
          }}
        />
      )}

      <Dialog show={showRestart}>
        <div className="my-[3.8125rem] md:mt-[4.1875rem] md:mb-[4.125rem] mx-auto w-fit">
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
        <div className="my-[3.8125rem] md:mt-[4.1875rem] md:mb-[4.125rem] mx-auto w-fit">
          <h1 className="text-center text-heading-m md:text-heading-l text-silver">
            round tied
          </h1>
          <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
            <Button
              variant="secondary"
              color="silver"
              onClick={() => dispatch({ type: "QUIT" })}
            >
              quit
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "NEXTROUND" });
              }}
              variant="secondary"
              color="yellow"
            >
              next round
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog show={gameState.result === "x" || gameState.result === "o"}>
        <div className="text-center mb-12 mt-10 md:my-[2.8125rem] mx-auto w-fit">
          <hgroup>
            <p className="text-body md:text-heading-xs text-silver">
              {dialogText()}
            </p>
            <h1 className="text-silver flex items-center justify-center gap-[0.5625rem] md:gap-6 mt-4 mb-6">
              {gameState.result === "x" ? (
                <X className="w-7 aspect-square md:w-16 text-light-blue" />
              ) : (
                <O className="w-7 aspect-square md:w-16 text-light-yellow" />
              )}
              <span
                className={clsx(
                  {
                    "text-light-blue": gameState.result === "x",
                    "text-light-yellow": gameState.result === "o",
                  },
                  "text-heading-m md:text-heading-l"
                )}
              >
                takes the round
              </span>
            </h1>
          </hgroup>
          <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
            <Button
              variant="secondary"
              color="silver"
              onClick={() => dispatch({ type: "QUIT" })}
            >
              quit
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "NEXTROUND" });
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
