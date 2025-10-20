import { useId, type ComponentProps } from "react";
import Button from "../components/Button/Button";

const NewGame = () => {
  const radioId = useId();
  const descId = useId();
  return (
    <section className="flex flex-col items-stretch gap-y-10 max-w-[28.75rem] w-full">
      <img
        width={71.97}
        height={32}
        className="self-center"
        src="images/logo.svg"
        alt=""
      />
      <div className=" bg-semi-dark-navy text-center text-silver px-6 pt-6 pb-[1.875rem] inset-shadow-l inset-shadow-dark-navy-b rounded-[15px]">
        <h1 id={radioId} className="uppercase text-heading-xs">
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
                defaultChecked
              />
              <X className="w-8 h-8 text-silver mx-auto peer-checked:text-dark-navy" />
            </label>
            <label className="flex-1 bg-dark-navy rounded-m py-[0.6875rem] has-checked:bg-silver hover:bg-silver/5 cursor-pointer">
              <input
                className="appearance-none absolute peer"
                type="radio"
                name="markerselect"
                aria-label="Y"
              />
              <O className="w-8 h-8 text-silver mx-auto peer-checked:text-dark-navy" />
            </label>
          </div>
        </fieldset>
        <p id={descId} className="uppercase text-body mt-[1.0625rem]">
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

const X = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M31.5569 5.28973L26.7103 0.443061C26.1195 -0.147687 25.1617 -0.147687 24.571 0.443061L16 9.01404L7.42902 0.443061C6.83827 -0.147687 5.88048 -0.147687 5.28973 0.443061L0.443061 5.28973C-0.147687 5.88048 -0.147687 6.83827 0.443061 7.42902L9.01404 16L0.443061 24.571C-0.147687 25.1617 -0.147687 26.1195 0.443061 26.7103L5.28973 31.5569C5.88048 32.1477 6.83827 32.1477 7.42902 31.5569L16 22.986L24.571 31.5569C25.1617 32.1477 26.1195 32.1477 26.7103 31.5569L31.5569 26.7103C32.1477 26.1195 32.1477 25.1617 31.5569 24.571L22.986 16L31.5569 7.42902C32.1477 6.83827 32.1477 5.88048 31.5569 5.28973Z"
      />
    </svg>
  );
};
const O = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M31.7412 15.8706C31.7412 7.10551 24.6357 0 15.8706 0C7.10551 0 0 7.10551 0 15.8706C0 24.6357 7.10551 31.7412 15.8706 31.7412C24.6357 31.7412 31.7412 24.6357 31.7412 15.8706ZM9.4048 15.8706C9.4048 12.2996 12.2996 9.4048 15.8706 9.4048C19.4416 9.4048 22.3364 12.2996 22.3364 15.8706C22.3364 19.4416 19.4416 22.3364 15.8706 22.3364C12.2996 22.3364 9.4048 19.4416 9.4048 15.8706Z"
      />
    </svg>
  );
};

export default NewGame;
