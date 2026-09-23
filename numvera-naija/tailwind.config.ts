import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8f1",
          100: "#d4f0de",
          200: "#a8e0bd",
          500: "#12a35a",
          600: "#0a6b3c",
          700: "#085530",
          800: "#064226",
          900: "#043822",
        },
        gold: {
          50: "#fbf6e6",
          100: "#f4e9c8",
          400: "#e0bc3a",
          500: "#c9a227",
          600: "#a8841a",
        },
      },
      boxShadow: {
        soft: "0 4px 24px rgba(4, 56, 34, 0.06)",
        brand: "0 8px 28px rgba(10, 107, 60, 0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
