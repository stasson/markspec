const katex = require('katex')
const texmath = require('markdown-it-texmath').use(katex)

module.exports = {
    name:'@markspec/plugin-katex',

    chainMarkdown (config) {
      config.plugin('katex')
        .use(texmath,{delimiters: 'gitlab'})
        .before('highlight')
    }

    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
};
