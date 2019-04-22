const path = require('path')
const sections = require("@markspec/markdown-it-sections");

module.exports = {
  name: "@markspec/vuepress-plugin-sections",
  chainMarkdown(config) {
    config
      .plugin("sections")
      .use(sections)
  },
};
