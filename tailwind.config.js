module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#06b6d4',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['system-ui', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
};
