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
        background: "var(--background)",
        "text-color": "var(--text-color)",
        "dark-gray": "#383838",
      },
      height: {
        '128': '32rem', 
        '144': '36rem', 
        '160': '40rem', 
        '192': '48rem', 
      },
    },
  },
  plugins: [],
};
export default config;
