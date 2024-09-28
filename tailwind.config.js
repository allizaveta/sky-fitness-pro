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
        "hover-white": "#F7F7F7",
        "active-white": "#E9ECED",
        "inactive-white-btn": "#999999",
        "error": "#DB0030",
        bg: "#FAFAFA",
        "exercise-blue": "#00C1FF"
      },
      scale: {
        '130': '1.30',
      },
      padding: {
        "pd-lg": "calc(50% - 580px)",
        "pd-s": "16px",
      },
      width: {
        'custom': 'var(width)',
      },
      height: {
        'custom': 'calc(100vh - 130px)',
      }
    },
  },
  variants: {},
  plugins: [],
};
