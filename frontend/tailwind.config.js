// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // 添加你的文件路径
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5733',  // 你可以设置自己喜欢的颜色
      },
    },
  },
  plugins: [],
}
