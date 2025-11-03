import { useEffect, useReducer, useState } from "react";
import NewGame from "./layouts/NewGame/NewGame";
import ActiveGame from "./layouts/ActiveGame/ActiveGame";
import type { GameState, Marker } from "./game/types";
import { createTiles } from "./game/utils";
import { cpuTurn, hasWon } from "./game/turn";
import RestartDialog from "./components/Dialog/RestartDialog/RestartDialog";
import TieDialog from "./components/Dialog/TieDialog/TieDialog";
import ResultDialog from "./components/Dialog/ResultDialog/ResultDialog";

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
  isHuman: boolean;
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
      if (
        gameState.vsCpu &&
        gameState.turn !== gameState.marker &&
        action.isHuman
      ) {
        return gameState;
      }

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

const save = (state: GameState) => {
  return window.localStorage.setItem("gamestate", JSON.stringify(state));
};

const init = () => {
  const localState = localStorage.getItem("gamestate");
  if (localState) {
    return JSON.parse(localState);
  }
  return defaultGameState;
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, init());
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    if (
      gameState.vsCpu &&
      gameState.status === "running" &&
      !gameState.result
    ) {
      const cpuMarker = gameState.marker === "x" ? "o" : "x";
      if (gameState.turn === cpuMarker) {
        const timer = setTimeout(
          () =>
            dispatch({
              type: "TICK",
              idx: cpuTurn(gameState.tiles, cpuMarker),
              isHuman: false,
            }),
          gameState.tiles.filter((marker) => marker).length === 0 ? 200 : 800
        );
        return () => clearTimeout(timer);
      }
    }
  }, [gameState]);

  useEffect(() => {
    save(gameState);
  }, [gameState]);

  return (
    <main aria-live="assertive">
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
          onTick={(idx) => dispatch({ type: "TICK", idx, isHuman: true })}
          onRestart={() => {
            setShowRestart(true);
          }}
        />
      )}

      <RestartDialog
        show={showRestart}
        onCancel={() => setShowRestart(false)}
        onRestart={() => {
          dispatch({ type: "RESTART" });
          setShowRestart(false);
        }}
      />

      <TieDialog
        show={gameState.result === "tie"}
        onQuit={() => dispatch({ type: "QUIT" })}
        onNextRound={() => {
          dispatch({ type: "NEXTROUND" });
        }}
      />

      <ResultDialog
        result={gameState.result}
        vsCpu={gameState.vsCpu}
        marker={gameState.marker}
        show={gameState.result === "x" || gameState.result === "o"}
        onQuit={() => dispatch({ type: "QUIT" })}
        onNextRound={() => {
          dispatch({ type: "NEXTROUND" });
        }}
      />
    </main>
  );
}

export default App;
