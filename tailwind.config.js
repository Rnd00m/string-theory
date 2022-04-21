module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      blue: "#0075a2",
      orange: "#f87060",
      "persian-orange": "#E08E45",
      yellow: "#FAC748",
      green: "#009B72",
      pink: "#EF476F",
      fuschia: "#CB48B7",
      white: "#ffffff",
      "white-light": "#d8dbe2",
      black: "#2A303C",
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          // Shades
          "--color-blue-100": "hsl(197, 100%, 64%)",
          "--color-blue-200": "hsl(197, 100%, 56%)",
          "--color-blue-300": "hsl(197, 100%, 48%)",
          "--color-blue-400": "hsl(197, 100%, 40%)",
          "--color-blue-500": "hsl(197, 100%, 32%)",
          "--color-blue-600": "hsl(197, 100%, 24%)",
          "--color-blue-700": "hsl(197, 100%, 16%)",
          "--color-blue-800": "hsl(197, 100%, 8%)",

          "--color-orange-100": "hsl(28, 71%, 81%)",
          "--color-orange-200": "hsl(28, 71%, 73%)",
          "--color-orange-300": "hsl(28, 71%, 65%)",
          "--color-orange-400": "hsl(28, 71%, 57%)",
          "--color-orange-500": "hsl(28, 71%, 49%)",
          "--color-orange-600": "hsl(28, 71%, 41%)",
          "--color-orange-700": "hsl(28, 71%, 33%)",
          "--color-orange-800": "hsl(28, 71%, 25%)",
          "--color-orange-900": "hsl(28, 71%, 17%)",

          primary: "hsl(28, 71%, 57%)", // --color-orange-400
          "primary-focus": "hsl(28, 71%, 49%)", // --color-orange-500
          "primary-content": "#000000",
          secondary: "hsl(197, 100%, 32%)", // --color-blue-500
          "secondary-focus": "hsl(197, 100%, 24%)", // --color-blue-600
          "secondary-content": "#000000",
          accent: "#fdca40",
          "accent-focus": "#fdc01f",
          "accent-content": "#000000",
          neutral: "#191D24",
          "neutral-focus": "#060c14",
          "neutral-content": "#ffffff",
          "base-100": "#2A303C",
          "base-200": "#1e242f",
          "base-300": "#080c16",
          "base-content": "#ebecf0",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
