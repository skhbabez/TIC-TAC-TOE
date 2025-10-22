import type { Meta, StoryObj } from "@storybook/react-vite";

import Dialog from "./Dialog";
import { useRef } from "react";

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const DialogShow = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className="bg-light-yellow"
        onClick={() => dialogRef.current?.showModal()}
      >
        Show Dialog
      </button>
      <Dialog ref={dialogRef}>
        <button
          className="bg-light-yellow"
          onClick={() => dialogRef.current?.close()}
        >
          Hide Dialog
        </button>
      </Dialog>
      ;
    </>
  );
};

export const Default: Story = {
  render: () => <DialogShow />,
};
