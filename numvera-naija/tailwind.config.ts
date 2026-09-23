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
          50: "#effbf3",
          100: "#d9f5e2",
          500: "#159447",
          600: "#0f7d3a",
          700: "#0b632f",
          900: "#07351b"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }
    },
  },
  plugins: [],
};
export default config;
