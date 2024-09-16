/* @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      laptop: "1160px",
    },
    extend: {
      colors: {
        "custom-green": "#BCEC30",
        "hover-green": "#C6FF00",
        "active-green": "#000000",
        "inactive-btn": "#F7F7F7",
        bg: "#FAFAFA",
      },
      padding: {
        "pd-lg": "calc(50% - 580px)",
        "pd-s": "16px",
      },
    },
  },
  plugins: [],
};
