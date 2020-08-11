const MarkdownIt = require("markdown-it");
const MarkspecPlugin = require("@markspec/markdown-it-markspec");

module.exports = async function render(text) {
  md = new MarkdownIt().use(MarkspecPlugin);
  body = md.render(text);

  return `
  <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1.4.0/themes/prism-vs.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
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
      ${body}
    </body>
  </html>
  `;
}
