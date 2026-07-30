import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink: '#080707', bone: '#eee9df', wine: '#702737' }, fontFamily: { display: ['var(--font-display)', 'Georgia', 'serif'], body: ['var(--font-body)', 'Arial', 'sans-serif'], type: ['Georgia', 'serif'] } } },
  plugins: []
};
export default config;
