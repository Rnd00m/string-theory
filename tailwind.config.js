module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'blue': '#0075a2',
      'orange': '#f87060',
      'persian-orange': '#E08E45',
      'yellow': '#FAC748',
      'green': '#009B72',
      'pink': '#EF476F',
      'fuschia': '#CB48B7',
      'white': '#ffffff',
      'white-light': '#d8dbe2',
      'black': '#272727',
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0075a2",
          "secondary": "#f87060",
          "accent": "#fdca40",
          "neutral": "#1b1b1b",
          "base-100": "#272727",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
  ],
}