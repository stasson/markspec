const prism = require("markdown-it-prism");

module.exports = function Plugin(md, options) {
  // force commonmark, linkify
  md.configure("default");
  md.set({ html: true, xhtmlOut: true, linkify: true });

  // add prisms highlighting
  md.use(prism);
};
