import Button from "../../components/Button/Button";
import O from "../../components/icons/O";
import X from "../../components/icons/X";
import clsx from "clsx";
import OutlineX from "../../components/icons/XOutline";
import OutlineO from "../../components/icons/OutlineO";
import type { Marker, Score, Tile } from "../../App";

interface ActiveGameProps {
  marker: Marker;
  vsCpu: boolean;
  tiles: Tile[];
  turn: Marker;
  score: Score;
  onTick: (id: number) => void;
  onRestart: () => void;
}

const ActiveGame = ({
  marker,
  vsCpu,
  tiles,
  turn,
  score,
  onTick,
  onRestart,
}: ActiveGameProps) => {
  const opponent = vsCpu ? "cpu" : "p2";
  const player = vsCpu ? "you" : "p1";

  return (
    <div className="max-w-game w-full">
      <header className="flex justify-between">
        <img
          width={71.97}
          height={32}
          className="self-center"
          src="images/logo.svg"
          alt=""
        />
        <div className="bg-semi-dark-navy rounded-m md:px-[1.875rem] px-[0.9375rem] md:pt-[0.8125rem] pt-[0.5625rem] md:pb-[1.1875rem] pb-[0.8125rem] inset-shadow-m inset-shadow-dark-navy-b">
          <span className="md:text-heading-xs text-body text-silver flex gap-[0.8125rem] ">
            {turn == "x" ? (
              <X className="w-4 h-4 md:w-5 md:h-5 text-silver inline-block" />
            ) : (
              <O className="w-4 h-4 md:w-5 md:h-5 text-silver inline-block" />
            )}
            Turn
          </span>
        </div>
        <Button
          variant="secondary"
          color="silver"
          className="max-[768px]:p-[0.769375rem]"
          onClick={onRestart}
        >
          <img
            className="w-[0.96125rem] h-[0.96125rem] md:w-[1.25rem] md:h-[1.25rem]"
            src="images/icon-restart.svg"
            alt="Restart Game"
          />
        </Button>
      </header>
      <div className="grid grid-cols-3 gap-5 pt-16 md:pt-[1.1875rem]">
        {tiles.map(({ id, marker }) => (
          <GameTile key={id} marker={marker} onTick={() => onTick(id)} />
        ))}
      </div>
      <footer className="grid grid-flow-col auto-cols-fr gap-5 pt-5 md:pt-[1.1875rem]">
        <ScoreTile
          label={`x (${marker === "x" ? player : opponent})`}
          score={score.playerX}
          color="bg-light-blue"
        />
        <ScoreTile label="ties" score={score.ties} color="bg-silver" />
        <ScoreTile
          label={`o (${marker === "o" ? player : opponent})`}
          score={score.playerO}
          color="bg-light-yellow"
        />
      </footer>
    </div>
  );
};

const GameTile = ({
  marker,
  onTick,
}: {
  marker: "x" | "o" | null;
  onTick: () => void;
}) => {
  const symbols = {
    x: (
      <>
        <X className="w-full aspect-square text-light-blue group-hover:hidden" />
        <OutlineX className="w-full aspect-square text-light-blue hidden group-hover:block" />
      </>
    ),
    o: (
      <>
        <O className="w-full aspect-square text-light-yellow group-hover:hidden " />
        <OutlineO className="w-full aspect-square text-light-yellow hidden group-hover:block" />
      </>
    ),
  };
  return (
    <button
      onClick={onTick}
      className="grid place-items-center rounded-l group bg-semi-dark-navy inset-shadow-l inset-shadow-dark-navy-b w-full aspect-square px-7 pt-6 pb-8 md:px-[2.375rem] md:py-[2.375rem] md:pb-[2.875rem] "
    >
      {marker && symbols[marker]}
    </button>
  );
};

const ScoreTile = ({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap rounded-m  py-3 md:pb-[0.6875rem] md:pt-[0.8125rem]",
        color
      )}
    >
      <label className="contents">
        <span className=" text-label md:text-body">{label}</span>
        <output className="text-heading-s md:text-heading-m">{score}</output>
      </label>
    </div>
  );
};

export default ActiveGame;
