/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pacific": ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}












// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     fontFamily: {
//       "pacific": ['Pacifico', 'cursive'],
//     },
//     extend: {},
//   },
//   plugins: [],
// }