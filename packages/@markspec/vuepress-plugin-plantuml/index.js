const plantuml = require("@markspec/markdown-it-plantuml")

module.exports = {
    name:'@markspec/plugin-plantuml',
    chainMarkdown (config) {
      config.plugin('plantuml')
        .use(plantuml)
        .before('highlight')
    }
};
