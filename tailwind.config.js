/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    100: "rgb(243 244 246)",
                    200: "rgb(234, 234, 234)",
                    300: "rgb(223, 223, 227)",

                },
                primary: "#595bd4",
                "c-hover": "rgba(123, 163, 255, 0.65)",
                "c-active": "rgb(44, 101, 236)",
            },
        },
        plugins: [],
    }
}