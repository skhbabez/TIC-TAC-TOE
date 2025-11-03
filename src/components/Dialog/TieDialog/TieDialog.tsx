import type { ComponentProps } from "react";
import Button from "../../Button/Button";
import Dialog from "../Dialog";

interface TieDialogProps extends ComponentProps<typeof Dialog> {
  onQuit: () => void;
  onNextRound: () => void;
}

const TieDialog = ({ onQuit, onNextRound, ...props }: TieDialogProps) => {
  return (
    <Dialog {...props}>
      <div className="my-[3.8125rem] md:mt-[4.1875rem] md:mb-[4.125rem] mx-auto w-fit">
        <h1 className="text-center text-heading-m md:text-heading-l text-silver">
          round tied
        </h1>
        <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
          <Button variant="secondary" color="silver" onClick={onQuit}>
            quit
          </Button>
          <Button
            onClick={onNextRound}
            variant="secondary"
            color="yellow"
            autoFocus
          >
            next round
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TieDialog;
