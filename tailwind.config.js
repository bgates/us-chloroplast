module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        1000: 1000,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
