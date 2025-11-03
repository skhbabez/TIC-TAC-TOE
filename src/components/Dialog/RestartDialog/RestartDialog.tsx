import type { ComponentProps } from "react";
import Button from "../../Button/Button";
import Dialog from "../Dialog";

interface RestartDialogProps extends ComponentProps<typeof Dialog> {
  onCancel: () => void;
  onRestart: () => void;
}

const RestartDialog = ({
  onCancel,
  onRestart,
  ...props
}: RestartDialogProps) => {
  return (
    <Dialog {...props}>
      <div className="my-[3.8125rem] md:mt-[4.1875rem] md:mb-[4.125rem] mx-auto w-fit">
        <h1 className="text-center text-heading-m md:text-heading-l text-silver">
          restart game?
        </h1>
        <div className="flex gap-4 mt-6 md:mt-[1.9375rem] justify-center">
          <Button
            variant="secondary"
            color="silver"
            onClick={onCancel}
            autoFocus
          >
            no, cancel
          </Button>
          <Button onClick={onRestart} variant="secondary" color="yellow">
            yes, restart
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default RestartDialog;
