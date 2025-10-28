import type { Meta, StoryObj } from "@storybook/react-vite";

import ActiveGame from "./ActiveGame";

const meta = {
  component: ActiveGame,
  decorators: [
    (Story) => (
      <main>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof ActiveGame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    marker: "x",
    vsCpu: true,
    tiles: Array.from({ length: 9 }, () => null),
    turn: "x",
    score: {
      playerX: 0,
      ties: 0,
      playerO: 0,
    },
    onTick: () => {},
    onRestart: () => {},
  },
};
