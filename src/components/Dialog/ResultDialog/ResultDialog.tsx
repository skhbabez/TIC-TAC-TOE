import type { ComponentProps } from "react";
import Button from "../../Button/Button";
import Dialog from "../Dialog";
import clsx from "clsx";
import X from "../../icons/X";
import O from "../../icons/O";
import type { Marker } from "../../../game/types";

interface ResultDialogProps extends ComponentProps<typeof Dialog> {
  result: "x" | "o" | "tie" | null;
  vsCpu: boolean;
  marker: Marker;
  onQuit: () => void;
  onNextRound: () => void;
}

const ResultDialog = ({
  result,
  vsCpu,
  marker,
  onQuit,
  onNextRound,
  ...props
}: ResultDialogProps) => {
  const dialogText = () => {
    if (vsCpu) {
      if (marker === result) {
        return "you won!";
      } else {
        return "oh no, you lost…";
      }
    } else {
      if (result === "x") {
        return "player 1 wins!";
      } else {
        return "player 2 wins!";
      }
    }
  };
  return (
    <Dialog {...props}>
      <div className="text-center mb-12 mt-10 md:my-[2.8125rem] mx-auto w-fit">
        <hgroup>
          <p className="text-body md:text-heading-xs text-silver">
            {dialogText()}
          </p>
          <h1 className="text-silver flex items-center justify-center gap-[0.5625rem] md:gap-6 mt-4 mb-6">
            {result === "x" ? (
              <X className="w-7 aspect-square md:w-16 text-light-blue" />
            ) : (
              <O className="w-7 aspect-square md:w-16 text-light-yellow" />
            )}
            <span
              className={clsx(
                {
                  "text-light-blue": result === "x",
                  "text-light-yellow": result === "o",
                },
                "text-heading-m md:text-heading-l"
              )}
            >
              takes the round
            </span>
          </h1>
        </hgroup>
        <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
          <Button variant="secondary" color="silver" onClick={onQuit}>
            quit
          </Button>
          <Button onClick={onNextRound} variant="secondary" color="yellow">
            next round
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ResultDialog;
