module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'header': '0 0 5px 1px #85858536'
      },
      screens: {
        'ex-mobile': { 'min': '1px', 'max': '350px' },
        'min-1-max-597': { 'min': '1px', 'max': '597px' },
        'min-1-max-330': { 'min': '1px', 'max': '330px' },
        'max-350': { 'min': '1px', 'max': '350px' },
        'max-419': { 'min': '1px', 'max': '419px' },
        'max-400': { 'min': '1px', 'max': '400px' },
        'min-1430': { 'min': '1430px' },
        'min-1380': { 'min': '1380px' },
      }
    },
  },
  plugins: [],
}
