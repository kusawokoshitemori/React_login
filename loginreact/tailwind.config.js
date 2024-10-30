/** @type {import('tailwindcss').Config} */
import textshadow from "tailwindcss-textshadow";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [textshadow],
};

export default config;
