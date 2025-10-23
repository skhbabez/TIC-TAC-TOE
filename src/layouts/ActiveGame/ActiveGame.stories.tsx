import type { Meta, StoryObj } from "@storybook/react-vite";

import ActiveGame from "./ActiveGame";

const meta = {
  component: ActiveGame,
  argTypes: {
    marker: {
      control: { type: "radio" },
      options: ["x", "o"],
    },
    vsCpu: {
      control: { type: "boolean" },
    },
  },
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
    tiles: Array.from({ length: 9 }, (_, i) => ({ id: i, marker: null })),
  },
};
