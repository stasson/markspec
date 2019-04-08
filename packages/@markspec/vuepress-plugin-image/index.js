module.exports = {
  name: "@markspec/vuepress-plugin-image",

  chainMarkdown(config) {
    config
      .plugin("mod-image")
      .use(markdownItPluginModImage)
      .end();
  },

  clientRootMixin: require("path").resolve(__dirname, "clientRootMixin.js")
};

function markdownItPluginModImage(md) {
  md.core.ruler.push("modify-image", function(state) {
    state.tokens.forEach(function(token) {
      if (token.children && token.children.length) {
        token.children.forEach(function(token) {
          if (token.type === "image") modifyImage(token, state.env);
        });
      }
      if (token.type === "image") modifyToken(token, state.env);
    });
    return false;
  });
}

function modifyImage(token, env) {
  if (token.type === "image") {
    // create attrObj for convenient get/set of attributes
    const attrObj = token.attrs
      ? token.attrs.reduce(function(acc, pair) {
          acc[pair[0]] = pair[1];
          return acc;
        }, {})
      : {};
    token.attrObj = attrObj;

    let content = token.content;
    const re = /\s?(\d+x\d+|x\d+)\s?/gi;
    const match = content.match(re);
    if (match) {
      content = content.replace(re, " ").trim();
      token.content = content;
      if (token.children.length) {
        const child = token.children[0];
        child.content = content;
      }

      const [width, height] = match[0]
        .toLowerCase()
        .trim()
        .split("x");
      if (width.length) {
        token.attrObj.width = width;
      }
      if (height.length) {
        token.attrObj.height = height;
      }

      // apply any overrides or new attributes from attrObj
      Object.keys(token.attrObj).forEach(function(k) {
        token.attrSet(k, token.attrObj[k]);
      });
    }
  }
}
