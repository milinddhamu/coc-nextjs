/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    screens: {
      'lg': '960px',
      'sm':'640px',
      'xs':'360px',
      'md':'800px',
      'xl':'1280px',
    },
    extend: {
      inset:{
      px:"1px",
      },
      colors:{
        "gray-button":"#0F1212",
      },
      padding:{
        "6px":"6px",
      },
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'coc-bg': "url('/public/cocbackground.jpg')"
      },
      fontFamily: { 
        'gasoek-one': ['Gasoek One', 'sans-serif'],
      },
      animation: {
        "bounce-slow":"bounce 2s infinite",
        text: 'text 6s ease infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-3%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        slideup : {
          "0%": {
            "transform": "translateY(100%)",
            "opacity": "0",
          },
          "100%" : {
            "transform": "translateY(0)",
            "opacity": "1",
          },
        },

        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar','@tailwindcss/line-clamp')],
}
