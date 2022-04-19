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
        mytheme: {
          primary: "#E08E45",
          secondary: "#0075a2",
          accent: "#fdca40",
          neutral: "#191D24",
          "base-100": "#2A303C",
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
