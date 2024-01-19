/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "poppins-regular": ["Poppins-regular", "sans-serif"],
      },

      backgroundColor: {
        "custom-bg-input": "#FFFFFF",
        "custom-primary-white": "#FFFFFF",
        "custom-secondary-white": "#F2F2F2",
        "custom-primary-blue": "#044BD9",
        "custom-secondary-blue": "#235FD9",
        "custom-red": "#B0252A",
        "custom-green": "#24A8AF",
        "custom-orange": "rgb(255,151,0)",
        "custom-blue": "#257DB0",
        "custom-black": "#2A2A2D",
        "custom-linear-blue": "rgb(0,172,238)",
        "custom-blue-light": "#F0F3FA",
        "custom-red-light": "#FAF0F6",

        // LIGHT THEME
        "--bg-primary-color": "#fbfdff",
        "--bg-secondary-color": "#f4faff",
        "--bg-ui-color": "#e6f4fe",
        "--bg-ui-color-hover": "#d5efff",
        "--bg-ui-color-press": "#c2e5ff",
        "--bg-solid-blue": "#0588f0",

        "--bg-ui-color-ruby": "#feeaed",
        "--bg-ui-color-ruby-hover": "#ffdce1",
        "--bg-ui-color-ruby-press": "#ffced6",
        "--bg-ui-orange-color": "#ffc182",
        "--bg-ui-orange-color-hover": "#f5ae73",
        "--bg-ui-orange-color-press": "#ec9455",

        // DARK THEME
        "--bg-dark-primary-color": "#111111",
        "--bg-dark-secondary-color": "#191919",
        "--bg-dark-ui-color": "#222222",
        "--bg-dark-ui-color-hover": " #2a2a2a",
        "--bg-dark-ui-color-press": "#313131",
        "--bg-dark-gray-slate": "#7b7b7b",

        "--bg-dark-ui-color-ruby": "#3a141e",
        "--bg-dark-ui-color-ruby-hover": "#4e1325",
        "--bg-dark-ui-color-ruby-press": "#5e1a2e",
      },
      textColor: {
        "custom-orange": "#FFAE10",
        "custom-blue": "#257DB0",
        "custom-red": "#B0252A",

        // LIGHT THEME , gray
        "--text-primary-gray-color": "#646464",
        "--text-secondary-color": "#202020",

        "--text-blue-color": "#0d74ce",
        "--text-ruby-color": "#64172b",

        // DARK THEME , grayDark
        "--text-dark-primary-color": "#b4b4b4",
        "--text-dark-secondary-color": "#eeeeee",

        "--text-dark-blue-color": "#70b8ff",
        "--text-dark-ruby-color": "#fed2e1",
      },
      borderColor: {
        "custom-gray": "#2A2A2D",
        "custom-black": "#CCCCCC",
        "custom-blue": "#257DB0",
        "custom-green": "#24A8AF",
        "custom-red": "#B0252A",

        // LIGHT THEME
        "--border-primary-color": "#acd8fc",
        "--border-secondary-color": "#8ec8f6",
        "--border-third-color": "#5eb1ef",

        // DARK THEME , grayDark
        "--border-dark-primary-color": "#3a3a3a",
        "--border-dark-secondary-color": "#484848",
        "--border-dark-third-color": "#606060",
      },
      boxShadow: {
        custom: "0 5.67587px 20.869px -1.16897px rgba(73,141,255,.3)",
        // custom: "0 5.67587px 20.869px -1.66897px rgba(73,141,255,.3)",
      },
      borderRadius: {
        custom: "12px",
      },
      screens: {
        "custom-xl": "1780px",
        "custom-lg": "940px",
        "custom-mobile": "320px",
      },
    },
  },
  plugins: [],
};
