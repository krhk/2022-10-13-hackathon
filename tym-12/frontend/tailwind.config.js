/** @type {import('tailwindcss').Config} */
module.exports = {
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#c4001e",
                    "secondary": "#D926A9",
                    "accent": "#1FB2A6",
                    "neutral": "#191D24",
                    "base-100": "#0c2f83",
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                },
            },
        ],
    },
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'nav-default': '#0c2f83',
            'nav-white': '#e2e8f0',
            'nav-red': '#c4001e',
            'text-black':'0a0a0a'
        },
        extend: {},
    },
    plugins: [require('daisyui')]
}
