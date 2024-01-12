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
          " linear-gradient(269.98deg, #E48039 0.02%, #12B4B9 99.98%)",
        "theme-grad":
          " linear-gradient(89.64deg, #15B4BB 2.6%, #399AC2 60.28%, #518AC6 97.5%)",
      },
      boxShadow: {
        "0-0": "0 0 10px 3px rgba(0, 0, 0, 0.1)",
        "md-0-0": "0 0 15px 2px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "theme-black": "#1A1A1A",
        theme: "#11B4B6",
      },
    },
  },
  plugins: [],
};
