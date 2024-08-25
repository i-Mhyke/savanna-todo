import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#0b1422",
        background: "#ffffff",
        text: "#303957",
        link: "#1b4ae8",
        input: {
          background: "#f7fbff",
          foreground: "#a4b0c2",
          border: "#e4e9f1",
        },
        primary: {
          background: "#162d3a",
          foreground: "#F5F5F5",
        },
        light: {
          background: "#f3f9fa",
          foreground: "#323857",
        },
        muted: "#959cb7",
        secondary: "#F5F5F5",
        accent: "#E53170",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
