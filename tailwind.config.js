/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: "class",

  theme: {
    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },

    extend: {
      keyframes: {
        like: {
          '0%, 100%': { scale: '1' },
          '50%': { scale: '1.5' },
        }
      },
      animation: {
        like: 'like 1s linear',
      },
      colors: {
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
