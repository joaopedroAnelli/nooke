import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './app/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        'nooke-white': '#F7F7F7',
        'warm-stone': '#A8A29E',
        'soft-ember': '#D97706',
        'deep-charcoal': '#1F2937',
        'bg-page': '#F7F7F7',
        'text-main': '#1F2937',
        'text-muted': '#A8A29E',
        accent: '#D97706',
        'border-soft': 'rgba(31, 41, 55, 0.06)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(31, 41, 55, 0.1), 0 2px 4px -1px rgba(31, 41, 55, 0.06)',
        medium:
          '0 10px 15px -3px rgba(31, 41, 55, 0.1), 0 4px 6px -2px rgba(31, 41, 55, 0.05)',
        large:
          '0 20px 25px -5px rgba(31, 41, 55, 0.1), 0 10px 10px -5px rgba(31, 41, 55, 0.04)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-10px)'},
        },
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
      },
      letterSpacing: {
        widest: '0.25em',
      },
      lineHeight: {
        relaxed: '1.65',
        loose: '1.75',
      },
    },
  },
  plugins: [],
} satisfies Config;
