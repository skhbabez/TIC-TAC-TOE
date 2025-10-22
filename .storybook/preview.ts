import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const viewports = {
  desktop: {
    name: "desktop",
    styles: {
      width: "1440px",
      height: "900px",
    },
  },
  tablet: {
    name: "tablet",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  mobile: {
    name: "mobile",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
};
const preview: Preview = {
  parameters: {
    viewport: {
      options: viewports,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    initialGlobals: {
      viewport: { value: "desktop" },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
