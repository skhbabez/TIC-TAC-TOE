import { useId } from "react";
import Button from "../../components/Button/Button";
import X from "../../components/icons/X";
import O from "../../components/icons/O";
import type { Marker } from "../../App";

interface NewGameProps {
  marker: Marker;
  startGame: (vsCpu: boolean) => void;
  onMarkerChange: (marker: Marker) => void;
}

const NewGame = ({ marker, startGame, onMarkerChange }: NewGameProps) => {
  const radioId = useId();
  const descId = useId();
  return (
    <section className="flex flex-col items-stretch gap-y-10 max-w-game w-full">
      <img
        width={71.97}
        height={32}
        className="self-center"
        src="images/logo.svg"
        alt=""
      />
      <div className=" bg-semi-dark-navy text-center text-silver px-6 pt-6 pb-[1.875rem] inset-shadow-l inset-shadow-dark-navy-b rounded-[15px]">
        <h1 id={radioId} className="text-heading-xs">
          Pick player 1's mark
        </h1>
        <fieldset
          className="bg-dark-navy rounded-m  mt-6 px-2 py-[0.5625rem]"
          aria-labelledby={radioId}
          aria-describedby={descId}
        >
          <div className="flex">
            <label className="flex-1 bg-dark-navy rounded-m py-[0.6875rem] text-center has-checked:bg-silver hover:bg-silver/5 cursor-pointer">
              <input
                className="appearance-none absolute peer"
                type="radio"
                name="markerselect"
                aria-label="X" /* test this */
                checked={marker === "x"}
                onChange={() => onMarkerChange("x")}
              />
              <X className="w-8 h-8 text-silver mx-auto peer-checked:text-dark-navy" />
            </label>
            <label className="flex-1 bg-dark-navy rounded-m py-[0.6875rem] has-checked:bg-silver hover:bg-silver/5 cursor-pointer">
              <input
                className="appearance-none absolute peer"
                type="radio"
                name="markerselect"
                aria-label="Y"
                value={"y"}
                checked={marker === "o"}
                onChange={() => onMarkerChange("o")}
              />
              <O className="w-8 h-8 text-silver mx-auto peer-checked:text-dark-navy" />
            </label>
          </div>
        </fieldset>
        <p id={descId} className="text-body mt-[1.0625rem]">
          Remember: X goes first
        </p>
      </div>
      <div className="flex flex-col gap-y-5">
        <Button
          onClick={() => startGame(true)}
          variant="primary"
          color="yellow"
        >
          New Game (vs CPU)
        </Button>
        <Button onClick={() => startGame(false)} variant="primary" color="blue">
          New Game (vs player)
        </Button>
      </div>
    </section>
  );
};

export default NewGame;
