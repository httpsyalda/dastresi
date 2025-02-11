/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*html", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};
