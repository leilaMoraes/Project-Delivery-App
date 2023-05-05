module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: '#2FC18C',
          dark: '#036B52',
        },
        blue: {
          light: '#056CF9',
          dark: '#421981',
        },
        delivered: '#00CC9B',
        preparing: '#66CC00',
        pending: '#CCB800',
        bg0: '#EAF1EF',
        bg1: '#F2FFFC',
        border0: '#B1C2BE',
      },
    },
  },
  plugins: [],
};
