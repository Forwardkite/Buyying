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
      },
      boxShadow: {
        "0-0": "0 0 10px 3px rgba(0, 0, 0, 0.1)",
        "md-0-0": "0 0 15px 2px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "theme-black": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
