module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      /*blue: "#0075a2",
      orange: "#f87060",
      "persian-orange": "#E08E45",
      yellow: "#FAC748",
      green: "#009B72",*/
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
          "--color-blue-light": "hsl(197, 100%, 42%)",
          "--color-blue": "hsl(197, 100%, 32%)",
          "--color-blue-dark": "hsl(197, 100%, 22%)",

          "--color-persian-orange-light": "hsl(28, 71%, 67%)",
          "--color-persian-orange": "hsl(28, 71%, 57%)",
          "--color-persian-orange-dark": "hsl(28, 71%, 47%)",
          "--color-persian-orange-darker": "hsl(28, 71%, 37%)",

          "--color-orange-light": "hsl(6, 92%, 77%)",
          "--color-orange": "hsl(6, 92%, 67%)",
          "--color-orange-dark": "hsl(6, 92%, 57%)",

          "--color-green-light": "hsl(164, 100%, 40%)",
          "--color-green": "hsl(164, 100%, 30%)",
          "--color-green-dark": "hsl(164, 100%, 20%)",
          "--color-green-darker": "hsl(164, 100%, 10%)",

          "--color-yellow-light": "hsl(43, 95%, 73%)",
          "--color-yellow": "hsl(43, 95%, 63%)",
          "--color-yellow-dark": "hsl(43, 95%, 53%)",

          "--color-white": "#ffffff",
          "--color-black": "#2A303C",

          primary: "hsl(28, 71%, 57%)", // --color-persian-orange-400
          "primary-focus": "hsl(28, 71%, 49%)", // --color-persian-orange-500
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
          "base-content": "#d8dbe2",
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