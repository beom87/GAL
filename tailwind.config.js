/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#d12026'
            },
            fontFamily: {
                omp: ['ONE-Mobile-POP'],
                noto: ['Noto Sans KR']
            }
        }
    },
    plugins: []
};
