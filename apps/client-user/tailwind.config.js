const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("../../tailwind.preset")],
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "80%": {
            opacity: 0.8,
          },
        },
      },
      animation: {
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};
