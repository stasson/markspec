const prism = require("markdown-it-prism");
const anchor = require("markdown-it-anchor");
const plantuml = require("@markspec/markdown-it-plantuml");
const katex = require("katex");
const texmath = require("markdown-it-texmath");
const mermaid = require("markdown-it-mermaid-plugin");
const footnote = require("markdown-it-footnote");
const emoji = require("markdown-it-emoji");
const taskLists = require('markdown-it-task-lists');
const frontmatter = require('markdown-it-front-matter')

module.exports = function Plugin(md, options) {
  // force commonmark, linkify
  md.configure("default");
  md.set({ html: true, xhtmlOut: true, linkify: true });
  // add gfm
  md.use(frontmatter, function (fm) {})
  md.use(anchor);
  md.use(footnote);
  md.use(emoji);
  md.use(taskLists)
  // add diagrams
  md.use(plantuml);
  md.use(texmath, {
    engine: katex,
    delimiters: "gitlab",
  });
  md.use(mermaid);

  // add prisms highlighting
  md.use(prism);
};
