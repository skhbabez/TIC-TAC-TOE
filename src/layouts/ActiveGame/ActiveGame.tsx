import Button from "../../components/Button/Button";
import X from "../../components/icons/X";

const ActiveGame = () => {
  return (
    <div className="max-w-game w-full">
      <div className="flex justify-between">
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
          />
        </Button>
      </div>
    </div>
  );
};

export default ActiveGame;
