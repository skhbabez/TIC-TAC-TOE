import Button from "../../components/Button/Button";
import O from "../../components/icons/O";
import X from "../../components/icons/X";
import clsx from "clsx";
import OutlineX from "../../components/icons/XOutline";
import OutlineO from "../../components/icons/OutlineO";

const ActiveGame = () => {
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
          <span className="md:text-heading-xs text-body text-silver uppercase flex gap-[0.8125rem] ">
            <X className="w-4 h-4 md:w-5 md:h-5 text-silver inline-block" />
            Turn
          </span>
        </div>
        <Button
          variant="secondary"
          color="silver"
          className="max-[768px]:p-[0.769375rem]"
        >
          <img
            className="w-[0.96125rem] h-[0.96125rem] md:w-[1.25rem] md:h-[1.25rem]"
            src="images/icon-restart.svg"
            alt="Restart Game"
          />
        </Button>
      </header>
      <div className="grid grid-cols-3 gap-5 pt-16 md:pt-[1.1875rem]">
        {Array(9)
          .fill(0)
          .map(() => (
            <GameTile marker="o" />
          ))}
      </div>
      <footer className="grid grid-flow-col auto-cols-fr gap-5 pt-5 md:pt-[1.1875rem]">
        <ScoreTile label="x (you)" score={14} color="bg-light-blue" />
        <ScoreTile label="ties" score={32} color="bg-silver" />
        <ScoreTile label="x (p2)" score={14} color="bg-light-yellow" />
      </footer>
    </div>
  );
};

const GameTile = ({ marker }: { marker?: "x" | "o" }) => {
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
    <button className="grid place-items-center rounded-l group bg-semi-dark-navy inset-shadow-l inset-shadow-dark-navy-b w-full aspect-square px-7 pt-6 pb-8 md:px-[2.375rem] md:py-[2.375rem] md:pb-[2.875rem] ">
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
        <span className="uppercase text-label md:text-body">{label}</span>
        <output className="text-heading-s md:text-heading-m">{score}</output>
      </label>
    </div>
  );
};

export default ActiveGame;
