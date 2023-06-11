/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE4D2D",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      // Add your custom styles here
      addComponents({
        ".container": {
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 4px",
          maxWidth: "80rem",
        },
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
    }),
  ],
};
