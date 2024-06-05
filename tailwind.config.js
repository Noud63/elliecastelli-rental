/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ChopinScript: ["ChopinScript"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
      screens: {
        xlg: "1050px",
      },
    },
  },
  plugins: [],
};
