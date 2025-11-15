import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7FA',
          100: '#B3E8F2',
          500: '#00B4D8',  // Main - Turquesa IA
          700: '#0096B8',
          900: '#006B85'
        },
        secondary: {
          500: '#0077B6',  // Azul confianza médica
        },
        accent: {
          500: '#FF6B6B',  // Coral - CTAs
        },
        success: {
          500: '#06D6A0',  // Verde confirmaciones
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
