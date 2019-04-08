const footnote = require('@gerhobbelt/markdown-it-footnote') 

module.exports = {
    name:'@markspec/vuepress-plugin-footnote',
    chainMarkdown (config) {
      config.plugin('footnote')
        .use(footnote)
        .end()
    }
};
