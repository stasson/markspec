module.exports = {
  name: "@markspec/vuepress-plugin-preset",
  plugins: [
    require("@markspec/vuepress-plugin-plantuml"),
    require("@markspec/vuepress-plugin-katex"),
    require("@markspec/vuepress-plugin-footnote")
  ]
};
