/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'facebook-blue': '#1877f2', // Primary Facebook Blue
        'facebook-hover': '#166fe5', // Slightly darker for hover states
        'facebook-green': '#42b72a', // Facebook Green (e.g., for creating new accounts/posts)
        'facebook-light-gray': '#f0f2f5', // Main background color
        'facebook-input-bg': '#f5f6f7', // Input field background (subtle change)
        'facebook-text-gray': '#606770', // Secondary text/icon color
        'facebook-icon-blue': '#0571ed', // Specific icon blue (e.g., Messenger icon)
        'facebook-placeholder': '#6b7280', // Placeholder text color
        'facebook-border': '#dadde1', // Light border color
      },
      spacing: {
        '4.5': '1.125rem', // 18px, useful for tighter layouts
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '30': '7.5rem', // 120px
      },
      borderRadius: {
        'fb': '8px', // Standard Facebook component radius
        'fb-input': '6px', // Slightly smaller radius for inputs
      },
      boxShadow: {
        'fb-card': '0 1px 2px rgba(0, 0, 0, 0.2)', // Standard card shadow
        'fb-modal': '0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)', // Modal/Dropdown shadow
      },
      fontSize: {
        'fb-sm': ['13px', '1.34'], // 13px with 18px line height
        'fb-base': ['15px', '1.34'], // 15px with 20px line height (Standard content text)
        'fb-lg': ['17px', '1.2'], // 17px
      },
      screens: {
        // Custom breakpoints mimicking common desktop/mobile splits
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Facebook often has a wide breakpoint for the main container
        'fb-wide': '1316px', 
      },
      animation: {
        'skeleton-pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Optional: Add a custom utility for hiding scrollbars while maintaining scroll functionality
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari and Opera */
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config