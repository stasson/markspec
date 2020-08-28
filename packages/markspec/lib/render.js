const MarkdownIt = require("markdown-it");
const MarkspecPlugin = require("@markspec/markdown-it-markspec");

module.exports = async function render(
  text,
  options = {
    pretty: true,
  },
  logger
) {
  md = new MarkdownIt().use(MarkspecPlugin);
  body = md.render(text);

  const html = `
  <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1/themes/prism-vs.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath@0.8.0/css/texmath.min.css">
        
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }
        
            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body class="markdown-body">
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({startOnLoad:true});</script>
    ${body}
    </body>
  </html>
  `;

  if (options.pretty) {
    // pretty
    try {
      const beautify = require("js-beautify").html;
      pretty = beautify(html);
      return pretty;
    } catch (e) {
      logger && logger.warn(`could not format html output`)
    }
  } else {
    // minify
    try {
      const minify = require("html-minifier").minify;
      const minified = minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
      });
      return minified;
    } catch (e) {
      logger && logger.warn(`could not minify html output`)
    }
  }
  return html;
};
