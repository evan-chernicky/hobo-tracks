module.exports = {
  content: ["./src/Components/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontSize: {
      'xl': 'clamp(.9rem, 2vw, 1.25rem)',
      '2xl': 'clamp(1.15rem, 2.5vw, 1.5rem)',
      '4xl': 'clamp(1.5rem, 4vw, 2.25rem)',
      '5xl': 'clamp(1.75rem, 5vw, 3rem)',
      '6xl': 'clamp(2rem, 6vw, 4rem)'
    },
    extend: {
      colors: {
        green: '#2E3E29',
        orange: '#E98A15'
      }
    },
  },
  plugins: [
  ],
  
}
