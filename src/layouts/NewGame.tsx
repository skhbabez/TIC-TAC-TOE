import Button from "../components/Button/Button";
import MarkerToggle from "../components/MarkerToggle/MarkerToggle";

const NewGame = () => {
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
        <h1 className="uppercase text-heading-xs ">Pick player 1's mark</h1>
        <MarkerToggle />
        <p className="uppercase text-body">Remember: X goes first</p>
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
