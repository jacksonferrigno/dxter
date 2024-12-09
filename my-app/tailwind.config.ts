module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Added app directory
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Added src directory
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#1E1E1E',
        lightGray: '#2E2E2E',
        redAccent: '#E63946',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(to right, #1E1E1E, #2E2E2E, #1E1E1E)',
      },
    },
  },
  plugins: [],
};