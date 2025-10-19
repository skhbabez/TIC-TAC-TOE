import { useId } from "react";
import Button from "../components/Button/Button";

const NewGame = () => {
  const toggleId = useId();
  const descId = useId();
  return (
    <section className="flex flex-col items-stretch gap-y-10 max-w-[28.75rem]">
      <img
        width={71.97}
        height={32}
        className="self-center"
        src="images/logo.svg"
        alt=""
      />
      <div className=" bg-semi-dark-navy text-center text-silver px-6 pt-6 pb-[1.875rem] inset-shadow-l inset-shadow-dark-navy-b rounded-[15px]">
        <h1 id={toggleId} className="uppercase text-heading-xs">
          Pick player 1's mark
        </h1>
        <div
          role="radiogroup"
          className="bg-dark-navy rounded-m px-2 py-[0.5625rem]"
          aria-labelledby={toggleId}
          aria-describedby={descId}
        >
          <div className="flex">
            <label className="flex-1 bg-dark-navy rounded-m py-[0.6875rem] text-center">
              <input
                className="appearance-none absolute"
                type="radio"
                name="markerselect"
              />
              <img
                className="mx-auto"
                width={32}
                height={32}
                src="images/icon-x.svg"
              />
            </label>
            <label className="flex-1 bg-silver rounded-m py-[0.6875rem]">
              <input
                className="appearance-none absolute"
                type="radio"
                name="markerselect"
              />
              <img
                className="mx-auto"
                width={32}
                height={32}
                src="images/icon-o.svg"
              />
            </label>
          </div>
        </div>
        <p id={descId} className="uppercase text-body">
          Remember: X goes first
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-y-5">
        <Button className="uppercase" variant="primary" color="yellow">
          New Game (vs CPU)
        </Button>
        <Button className="uppercase" variant="primary" color="blue">
          New Game (vs player)
        </Button>
      </div>
    </section>
  );
};

export default NewGame;
