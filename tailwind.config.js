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
