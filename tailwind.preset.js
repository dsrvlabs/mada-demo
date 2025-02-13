const colors = {
  // 예시 코드, 본인의 프로젝트 디자인 시스템에 맞추어 추가해 주세요.
  gray: {
    white: "#ffffff", // Gray-01
    25: "#f2f2f2", // Gray-02
    50: "#e5e5e5", // Gray-03
    100: "#d8d8d8", // Gray-04
    200: "#cbcbcb", // Gray-05
    300: "#b2b2b2", // Gray-06
    400: "#989898", // Gray-07
    500: "#7e7e7e", // Gray-08
    600: "#656565", // Gray-09
    700: "#4c4c4c", // Gray-10
    800: "#323232", // Gray-11
    900: "#191919", // Gray-12
    950: "#0d0d0d", // Gray-13
    black: "#000000", // Gray-14
  },
  message: {
    error: "#f04438",
    success: "#12b76a",
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("./tools/plugins/tailwind")],
  safelist: [
    "after:pb-[50%]",
    "after:pb-[75%]",
    "after:pb-[100%]",
    "max-w-[none]",
    "max-h-[none]",
    "max-w-full",
    "max-h-full",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    // 예시 코드, 본인의 프로젝트 디자인 시스템에 맞추어 추가해 주세요.
    screens: {
      sm: "600px",
      md: "1024px",
      lg: "1440px",
    },
    extend: {
      colors: {
        ...colors,
        theme: {
          gray: colors.gray[500],
          white: colors.gray.white,
          black: colors.gray.black,
          success: colors.message.success,
          error: colors.message.error,
        },
      },
    },
  },
}
