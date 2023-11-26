module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "hsl(28, 71%, 57%)", // --color-persian-orange-400
          "primary-focus": "hsl(28, 71%, 49%)", // --color-persian-orange-500
          "primary-content": "#000000",
          secondary: "hsl(197, 100%, 32%)", // --color-blue-500
          "secondary-focus": "hsl(197, 100%, 24%)", // --color-blue-600
          "secondary-content": "#ffffff",
          accent: "#fdca40",
          "accent-focus": "#fdc01f",
          "accent-content": "#000000",
          neutral: "#191D24",
          "neutral-focus": "#060c14",
          "neutral-content": "#ffffff",
          "base-100": "#2A303C",
          "base-200": "#1e242f",
          "base-300": "#080c16",
          "base-content": "#d8dbe2",
          info: "#3ABFF8",
          success: "#02a659",
          warning: "#fd8621",
          error: "#dc3055",
        },
      },
      {
        winter: {
          ...require("daisyui/src/theming/themes")["[data-theme=winter]"],
          info: "#3ABFF8",
          success: "#02a659",
          warning: "#fd8621",
          error: "#dc3055",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
