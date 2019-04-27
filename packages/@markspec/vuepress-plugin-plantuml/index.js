const path = require('path')
const plantuml = require("@markspec/markdown-it-plantuml");

module.exports = {
  name: "@markspec/vuepress-plugin-plantuml",
  chainMarkdown(config) {
    config
      .plugin("plantuml")
      .use(plantuml)
      .before("highlight")
  }
};
