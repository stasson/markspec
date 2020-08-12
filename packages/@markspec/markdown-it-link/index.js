const indexRE = /(^|.*\/)(index|readme).md(#?.*)$/i;
const externalRE = /^https?:/;
const sourceRE = /(\/|\.md|\.html)(#.*)?$/;

module.exports = function (md) {
  // md.core.ruler.after("inline", "replace-link", function (state) {
  //   state.tokens.forEach(function (blockToken) {
  //     if (blockToken.type === "inline" && blockToken.children) {
  //       blockToken.children.forEach(function (token) {
  //         const type = token.type;
  //         if (type === "link_open") {
  //           replaceAttr(token, "href", replaceLink, state.env);
  //         }
  //       });
  //     }
  //   });
  //   return false;
  // });

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex];
      const href = link[1];
      if (externalRE.test(href)) {
        // blank target here
        var aIndex = tokens[idx].attrIndex('target')
        if (aIndex < 0) {
          tokens[idx].attrPush(['target', '_blank']) // add new attribute
        }
      } else if (sourceRE.test(href)) {
        // remplace md with html
        if (indexRE.test(href)) {
          link[1] = href
            .replace(/readme\.md$/i, "index.html")
            .replace(/readme\.md(#.*)$/i, "index.html$1");
        } else {
          link[1] = href
            .replace(/\.md$/, ".html")
            .replace(/\.md(#.*)$/, ".html$1");
        }
      }
    }
    return self.renderToken(tokens, idx, options)
  };
};
