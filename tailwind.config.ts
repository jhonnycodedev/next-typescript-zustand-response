import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      ...colors,
      primary: colors.yellow,//cor principal das letras
      secondary: colors.white,//cor de fundo das letras
      textPrimary: colors.white,//cor dos textos 
      tertiary: {//propiedades da cor de fundo do site
        DEFAULT: 'rgb(18 18 18)',
      },
      formcolor: {//propiedades da cor de fundo do formulario
        DEFAULT: 'rgb(20 18 18)',
      },
    },
  },
  plugins: [],

  
};
export default config;
