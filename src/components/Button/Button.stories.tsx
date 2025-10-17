import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    color: {
      control: { type: "select" },
      options: ["yellow", "blue", "silver"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "primary", color: "yellow", children: "Click me!" },
};
