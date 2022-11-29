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

        'steel_teal': '#6A8D92',
        'pleased_green': '#afc6b6',
        'dark_sea_green': '#80B192',
        'morning_blue': '#8AA29E',
        'light_morning_blue': '#ebf5f3',

        'grey': '#ACACAC',
        'light_grey': '#aeaeae',
        'grey_message': '#e5e7eb',
        'dim_bg': '#f9f9f9'
      },
      fontFamily:
      {
        'poppins': ['Poppins'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
