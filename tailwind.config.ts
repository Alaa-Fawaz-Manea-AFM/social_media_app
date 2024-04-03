import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "375px",
      xs: "480px",
      ssx: "620px",
      ss: "680px",
      sm: "768px",
      mdD: "930px",
      md: "1060px",
      lg: "1200px",
      lgg: "1500px",
      xl: "1700px",
    },
  },
  plugins: [],
};
export default config;
