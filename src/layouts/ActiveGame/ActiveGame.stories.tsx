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
  args: {},
};
