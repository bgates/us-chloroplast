module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          "map-100": "var(--colors-blue-100)",
          "map-200": "var(--colors-blue-200)",
          "map-300": "var(--colors-blue-300)",
          "map-400": "var(--colors-blue-400)",
          "map-500": "var(--colors-blue-500)",
          "map-600": "var(--colors-blue-600)",
          "map-700": "var(--colors-blue-700)",
          "map-800": "var(--colors-blue-800)",
          "map-900": "var(--colors-blue-900)",
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
