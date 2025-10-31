import type { Meta, StoryObj } from "@storybook/react-vite";

import TieDialog from "./TieDialog";

const meta = {
  component: TieDialog,
} satisfies Meta<typeof TieDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    onNextRound: () => {},
    onQuit: () => {},
  },
};
