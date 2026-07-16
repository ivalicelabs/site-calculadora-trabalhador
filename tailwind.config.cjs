/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './scripts/**/*.{mjs,js}',
    './assets/js/**/*.js',
    './**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1b5e3b', deep: '#1a5a4a', mint: '#e8f5e9' },
        page: '#f9fafb',
        ink: { DEFAULT: '#111827', muted: '#6b7280', faint: '#9ca3af', soft: '#687280' },
        line: '#e5e7eb',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1440px', calc: '800px' },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.03)',
        hero: '0 8px 16px rgba(0,0,0,0.03)',
      },
    },
  },
  plugins: [],
};
