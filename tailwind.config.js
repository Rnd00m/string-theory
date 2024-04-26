import tailwindTypography from '@tailwindcss/typography'
import daisyui from "daisyui";

module.exports = {
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "hsl(221, 83%, 55%)",
          "primary-focus": "hsl(221, 83%, 45%)",
          "primary-content": "#ffffff",
          "secondary": "hsl(25, 95%, 55%)",
          "secondary-focus": "hsl(24, 95%, 45%)",
          "secondary-content": "#ffffff",
          "accent": "hsl(43, 95%, 55%)",
          "accent-focus": "hsl(43, 95%, 45%)",
          "accent-content": "#000000",
          "info": "#3ABFF8",
          "success": "#02a659",
          "success-content": "#ffffff",
          "warning": "#fd8621",
          "warning-content": "#ffffff",
          "error": "#dc3055",
          "error-content": "#ffffff",
        },
      },
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          "primary": "hsl(221, 83%, 55%)",
          "primary-focus": "hsl(221, 83%, 45%)",
          "primary-content": "#ffffff",
          "info": "#3ABFF8",
          "success": "#02a659",
          "success-content": "#ffffff",
          "warning": "#fd8621",
          "warning-content": "#ffffff",
          "error": "#dc3055",
          "error-content": "#ffffff",
        },
      },
    ],
  },
  plugins: [tailwindTypography, daisyui],
};
