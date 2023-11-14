/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                lightGrey: "#DCDCDC",
                bgIcon: "#E8EBF2",
                descriptionGrey: "#818181",
                borderGrey: "#F0F0F0",
                borderDarkGrey: "#E7E7E7",
                lowWhite: "#fafafa",
                offWhite: "#f3f5f7",
                darkWhite: "#E8EBEE",
                lightBlue: "#F0F5FF",
                darkGrey: "#232323",
                redRequired: "#E81E1E",
                redBgDelete: "#FFF4F4",
                redDelete: "#FF4D4F",
                blueEdit: "#1890FF",
                warning: {
                    light: "#FFFBE6",
                    dark: "#FFE58F",
                },
                primary: "#ea4042",
                twitter: "#00aaec",
                discord: "#7289da",
                facebook: "#4267b2",
                linkedin: "#2977c9",
            },
            fontFamily: {},
        },
    },
};
