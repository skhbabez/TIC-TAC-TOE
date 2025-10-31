import type { Meta, StoryObj } from "@storybook/react-vite";

import ResultDialog from "./ResultDialog";

const meta = {
  component: ResultDialog,
} satisfies Meta<typeof ResultDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    result: "x",
    vsCpu: true,
    marker: "x",
    onQuit: () => {},
    onNextRound: () => {},
  },
};
