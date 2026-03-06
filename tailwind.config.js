const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
        mono: ['Fira Code', ...fontFamily.mono],
      },
      colors: {
        primary: '#5B21B6',
        secondary: '#4F46E5',
        accent: '#D97706',
        background: '#F9FAFB',
        foreground: '#1F2937',
      },
    },
  },
  plugins: [],
};