import type { Meta, StoryObj } from "@storybook/react-vite";

import RestartDialog from "./RestartDialog";

const meta = {
  component: RestartDialog,
} satisfies Meta<typeof RestartDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    onRestart: () => {},
    onCancel: () => {},
  },
};
