import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ['class', '.dark'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: { borderRadius: { xl: "1rem", "2xl": "1.5rem" } },
  },
  plugins: [],
};
export default config;
