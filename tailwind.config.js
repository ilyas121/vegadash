/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'crystal': '#e8f4ff',
        'crystal-op': 'rgba(255, 255, 255, 0.25)',
        'success': '#28a745',
        'danger': '#e74c3c',
        'sf-link': '#62d0f0',
        'white-op': 'rgba(255, 255, 255, 0.75)',
      },
      fontFamily: {
        'open': ['Open Sans', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        'ares': "url('../assets/img/bg_ares.jpg')",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'fadeIn': 'fadeIn 1s ease-in',
        'fadeInLeft': 'fadeInLeft 1s ease-in',
        'fadeInRight': 'fadeInRight 1s ease-in',
        'fadeInDown': 'fadeInDown 1s ease-in',
      },
      backgroundColor: {
        'modern-sf': 'rgba(0, 22, 41, 0.75)',
        'vintage-sf': 'rgba(197, 107, 19, 0.35)',
        'interstellar-sf': 'rgba(255, 0, 192, 0.35)',
        'block': 'rgba(0, 0, 0, 0.15)',
      },
      borderColor: {
        'block': 'rgba(255, 255, 255, 0.1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate3d(0, 0, 0)'
          },
        },
        fadeInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translate3d(100%, 0, 0)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate3d(0, 0, 0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate3d(0, 0, 0)'
          },
        }
      },
    },
  },
  plugins: [],
} 