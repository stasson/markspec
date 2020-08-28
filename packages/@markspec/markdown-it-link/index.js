const indexRE = /(^|.*\/)(index|readme).md(#?.*)$/i;
const externalRE = /^https?:/;
const sourceRE = /(\/|\.md|\.html)(#.*)?$/;

module.exports = function (md) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex];
      const href = link[1];
      if (externalRE.test(href)) {
        // IF external url: set blank target
        var aIndex = tokens[idx].attrIndex("target");
        if (aIndex < 0) {
          tokens[idx].attrPush(["target", "_blank"]);
        }
      } else if (sourceRE.test(href)) {
        // IF NOT external and source url
        if (indexRE.test(href)) {
          // AND readme url: set link to `index.html`
          link[1] = href
            .replace(/readme\.md$/i, "index.html")
            .replace(/readme\.md(#.*)$/i, "index.html$1");
        } else {
          // ELSE: set html link
          link[1] = href
            .replace(/\.md$/, ".html")
            .replace(/\.md(#.*)$/, ".html$1");
        }
      }
    }
    return self.renderToken(tokens, idx, options);
  };
};
