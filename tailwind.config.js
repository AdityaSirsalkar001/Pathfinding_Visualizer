/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wallAnimation: {
          '0%': { transform: 'scale(0.3)', backgroundColor: '#475569' },
          '100%': { transform: 'scale(1)', backgroundColor: '#f8fafc' },
        },
        visitedAnimation: {
          '0%': { transform: 'scale(0.3)', backgroundColor: '#8b5cf6', borderRadius: '50%' },
          '50%': { backgroundColor: '#3b82f6' },
          '100%': { transform: 'scale(1)', backgroundColor: '#22d3ee' }, 
        },
        shortestPath: {
          '0%': { transform: 'scale(0.3)', backgroundColor: '#fcd34d' },
          '100%': { transform: 'scale(1)', backgroundColor: '#f59e0b', boxShadow: '0 0 15px #f59e0b' },
        }
      },
      animation: {
        wall: 'wallAnimation 0.3s ease-out forwards',
        visited: 'visitedAnimation 0.7s ease-out forwards',
        path: 'shortestPath 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}