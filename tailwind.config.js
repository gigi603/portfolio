module.exports = {
  // Tailwind 2 syntax (`content` is Tailwind 3 and was ignored, shipping a 2.6 MB stylesheet)
  purge: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#D2D3D5',
        'blue': '#4169E1'
      }
    },
    fontFamily: {
      'poppins': ['Poppins']
    },
  },
  plugins: [],
}
