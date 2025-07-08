const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
