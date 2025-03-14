module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E2028',
        accent: '#10B981',
        weak: '#DC2626',
        secondary: '#9CA3AF',
      },
      spacing: {
        'side': '24px',
        'element': '16px',
        'card': '12px',
      },
      fontSize: {
        'logo': '18px',
        'section': '16px',
        'base': '14px',
        'sm': '12px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
