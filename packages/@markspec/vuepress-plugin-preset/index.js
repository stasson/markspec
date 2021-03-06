module.exports = {
  name: "@markspec/vuepress-plugin-preset",
  plugins: [
    require("@markspec/vuepress-plugin-config"),
    require("@markspec/vuepress-plugin-plantuml"),
    require("@markspec/vuepress-plugin-katex"),
    require("@markspec/vuepress-plugin-footnote"),
    require("@markspec/vuepress-plugin-image"),
    require("@markspec/vuepress-plugin-sections")
  ]
};
