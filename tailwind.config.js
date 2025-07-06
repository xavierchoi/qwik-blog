/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3B82F6",
          secondary: "#10B981",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3B82F6",
          secondary: "#10B981",
        },
      },
    ],
  },
};