module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#8E8EC8',
        'purple_grey': '#9197B3',
        'purple_light':'#F3F3FF',
        'purple_2': '#b0b0e8',
        'pink': '#DBC0DD',
        'grey': '#ACACAC'
      },
      fontFamily:
      {
        'poppins': ['Poppins'],
      }
    },
  },
  plugins: [],
}
