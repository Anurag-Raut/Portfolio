import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#1e1e2e',
        text: '#cdd6f4',
        muted: '#a6adc8',
        border: '#313244',
        accent: '#cba6f7',
        surface: '#181825',
        'surface-hover': '#45475a',
        'accent-secondary': '#b4befe',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '768px',
        wide: '1024px',
      },
    },
  },
  plugins: [typography],
};
