const { defineConfig } = require("tailwindcss");

module.exports = defineConfig({
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Example primary color
        secondary: '#9333ea', // Example secondary color
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'], // Example body font
        heading: ['Montserrat', 'sans-serif'], // Example heading font
      },
    },
  },
  plugins: [],
});