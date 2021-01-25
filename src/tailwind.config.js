module.exports = {
  purge: ["./**/*.{js,jsx,ts,tsx}", "../public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          "map-100": "var(--blue-100)",
          "map-200": "var(--blue-200)",
          "map-300": "var(--blue-300)",
          "map-400": "var(--blue-400)",
          "map-500": "var(--blue-500)",
          "map-600": "var(--blue-600)",
          "map-700": "var(--blue-700)",
          "map-800": "var(--blue-800)",
          "map-900": "var(--blue-900)",
        },
      },
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
