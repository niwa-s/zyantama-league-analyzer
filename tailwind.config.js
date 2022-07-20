/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      // https://tailwindcss.com/docs/content-configuration#safelisting-classes
      // テンプレートリテラルで使用する文字列をあらかじめ宣言する必要がある？(もっといい方法がありそう...)
      pattern: /bg-(indigo|yellow|red|purple|pink|green|blue)-(100|200|500|700)/,
      variants: ["hover"],
    },
    {
      pattern: /text-(indigo|yellow|red|purple|pink|green|blue)-(500|800)/,
    }
  ],
  plugins: [],
};
