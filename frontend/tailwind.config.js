/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "theme-grad-dual":
          " linear-gradient(270deg, #E48039 0.02%, #12B4B9 99.98%)",
        "theme-grad-dual-reverse":
          " linear-gradient(90deg, #E48039 0.02%, #12B4B9 99.98%)",
        "theme-grad":
          " linear-gradient(89.64deg, #15B4BB 2.6%, #399AC2 60.28%, #518AC6 97.5%)",
        "theme-grad-cyan":
          " linear-gradient(270deg, #5287C6 2.6%,  #12B4B9 97.5%)",
        "theme-grad-orange":
          " linear-gradient(89.64deg, #EE6C74 2.6%,  #F39751 97.5%)",
        pattern: "url('/assets/img/pattern-theme.svg')",
        "pattern-orange": "url('/assets/img/pattern-theme-orange.svg')",
      },
      boxShadow: {
        "0-0": "0 0 10px 3px rgba(0, 0, 0, 0.1)",
        "md-0-0": "0 0 15px 2px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "theme-gray": "#D9D9D9",
        "theme-black": "#1A1A1A",
        "theme-light": "#11B4B7",
        theme: "#11B4B6",
        "theme-purple": "#4c34c2",
      },
    },
  },
  plugins: [],
};
