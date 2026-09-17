import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed", // Electric Violet
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        electric: {
          blue: "#0ea5e9",
          cyan: "#06b6d4",
          violet: "#8b5cf6",
          pink: "#ec4899",
        },
        whatsapp: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(124, 58, 237, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(34, 197, 94, 0.25)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'card-hover': '0 12px 30px -10px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-bright': 'radial-gradient(at 10% 10%, rgba(139, 92, 246, 0.08) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(14, 165, 233, 0.08) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(236, 72, 153, 0.05) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
};
export default config;
