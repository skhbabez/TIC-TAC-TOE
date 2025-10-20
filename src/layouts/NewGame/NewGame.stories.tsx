import type { Meta, StoryObj } from "@storybook/react-vite";

import NewGame from "./NewGame";

const meta = {
  component: NewGame,
  decorators: [
    (Story) => (
      <main>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof NewGame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
