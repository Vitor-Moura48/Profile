// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        // Keyframe para fade-in
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Keyframe para scale-in (zoom)
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Keyframe para fade-out e scale-out (minimizar) - opcional, requer mais lógica
        // fadeOut: {
        //   '0%': { opacity: '1' },
        //   '100%': { opacity: '0' },
        // },
        // scaleOut: {
        //   '0%': { transform: 'scale(1)', opacity: '1' },
        //   '100%': { transform: 'scale(0.9)', opacity: '0' },
        // },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards', // 0.3 segundos para o fade-in do overlay
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.2, 0, 0, 1) forwards', // 0.3s para o zoom da imagem
        // 'fade-out': 'fadeOut 0.3s ease-out forwards', // Para o fechamento
        // 'scale-out': 'scaleOut 0.3s cubic-bezier(0.2, 0, 0, 1) forwards', // Para o fechamento
      },
    },
  },
  plugins: [],
};