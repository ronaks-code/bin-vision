/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// const colors = require('tailwindcss/colors')

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: 'class', // or 'media' or boolean
//   theme: {
//     screens: {
//       'sm': '640px',
//       'md': '768px',
//       'lg': '1024px',
//       'lg-xl': '1125px',
//       'xl': '1280px',
//       '2xl': '1536px',
//     },
//     extend: {
//       colors: {
//         gray: {
//           900: '#202225',
//           800: '#2f3136',
//           700: '#36393f',
//           600: '#4f545c',
//           400: '#d4d7dc',
//           300: '#e3e5e8',
//           200: '#ebedef',
//           100: '#f2f3f5',
//         },
//       },
//       keyframes: {
//         'zoom-in': {
//           '0%': { transform: 'scale(0.95)', opacity: 0 },
//           '100%': { transform: 'scale(1)', opacity: 1 },
//         },
//         'zoom-out': {
//           '0%': { transform: 'scale(1)', opacity: 1 },
//           '100%': { transform: 'scale(0.95)', opacity: 0 },
//         },
//       },
//       animation: {
//         'zoom-in': 'zoom-in 0.3s',
//         'zoom-out': 'zoom-out 0.3s', 
//       },
//       transitionProperty: {
//         multiple: "width, height",
//       },
//       transitionDuration: {
//         0: "0ms",
//         800: "800ms",
//         1200: "1200ms",
//         1300: "1300ms",
//         1500: "1500ms",
//         2000: "2000ms",
//       },
//     },
//   },
//   plugins: [
//     require('tailwindcss-animate'),
//   ],
// };
