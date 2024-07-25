/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                main: '#d12026'
            },
            fontFamily: {
                omp: ['ONE-Mobile-POP'],
                noto: ['Noto Sans KR']
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'bounce-2': {
                    '0%, 50%, 100%': {
                        transform: 'none'
                    },
                    '25%': { transform: 'translateY(2.5%)' },
                    '75%': { transform: 'translateY(-2.5%)' }
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' }
                },
                'text-gradient': {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'bounce-2': 'bounce-2 1s infinite ease-out',
                wiggle: 'wiggle 1s ease-in-out infinite',
                'text-gradient': 'text-gradient 1s infinite'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
