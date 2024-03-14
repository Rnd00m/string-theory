// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          // eslint-disable-next-line no-undef
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "hsl(221, 83%, 55%)", // --color-blue-orange-500
          "primary-focus": "hsl(221, 83%, 45%)", // --color-blue-orange-600
          "primary-content": "#ffffff",
          secondary: "hsl(25, 95%, 55%)", // --color-orange-500
          "secondary-focus": "hsl(24, 95%, 45%)", // --color-orange-600
          "secondary-content": "#ffffff",
          accent: "hsl(43, 95%, 55%)", // --color-yellow-500
          "accent-focus": "hsl(43, 95%, 45%)", // --color-yellow-600
          "accent-content": "#000000",
          info: "#3ABFF8",
          success: "#02a659",
          warning: "#fd8621",
          error: "#dc3055",
        },
      },
      {
        winter: {
          // eslint-disable-next-line no-undef
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "hsl(221, 83%, 55%)", // --color-blue-orange-500
          "primary-focus": "hsl(221, 83%, 45%)", // --color-blue-orange-600
          "primary-content": "#ffffff",
          info: "#3ABFF8",
          success: "#02a659",
          warning: "#fd8621",
          error: "#dc3055",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
