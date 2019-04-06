const {toUriSync} = require('@markspec/plantuml')

module.exports = function Plugin(md, options) {

  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (/uml|puml|plantuml/.test(token.info)) {
      return generateChart(code)
    }

    return temp(tokens, idx, options, env, slf)
  }
};

function generateChart(code) {
  try {
    const uri = toUriSync(code)
    return `<p><img src="${uri}" alt="uml diagram"></p>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}
