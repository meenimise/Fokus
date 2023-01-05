module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
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
        'poppins': ['SVN_Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
