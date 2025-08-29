module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.2' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)', opacity: '0.3' },
        }
      }
    },
  },
  plugins: [],
}