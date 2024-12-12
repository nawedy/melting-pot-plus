const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f3f0',
          100: '#efe7e1',
          200: '#dfcfc3',
          300: '#cfb7a5',
          400: '#bf9f87',
          500: '#af8769',
          600: '#8c6c54',
          700: '#69513f',
          800: '#46362a',
          900: '#231b15',
        },
        secondary: {
          50: '#f0f7f7',
          100: '#e1efef',
          200: '#c3dfdf',
          300: '#a5cfcf',
          400: '#87bfbf',
          500: '#69afaf',
          600: '#548c8c',
          700: '#3f6969',
          800: '#2a4646',
          900: '#152323',
        },
        cream: {
          50: '#fdfcfb',
          100: '#fbf8f6',
          200: '#f7f1ed',
          300: '#f3eae4',
          400: '#efe3db',
          500: '#ebdcd2',
          600: '#bcb0a8',
          700: '#8d847e',
          800: '#5e5854',
          900: '#2f2c2a',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'diagonal-fade': 'linear-gradient(105deg, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'scroll-slow': 'scroll 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.parallax': {
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        },
        '.parallax-child': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        '.diagonal-split': {
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        },
        '.diagonal-split-reverse': {
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
        },
        '.blend-overlay': {
          mixBlendMode: 'overlay',
        },
        '.blend-soft-light': {
          mixBlendMode: 'soft-light',
        },
      });
    }),
  ],
} 