const {toUriSync} = require('@markspec/plantuml')

module.exports = function Plugin(md, options) {

  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (/uml|puml|plantuml/.test(token.info)) {
      return generateUmlChart(code)
    }
    if (/ditaa/.test(token.info)) {
      return generateDitaaChart(code)
    }
    return temp(tokens, idx, options, env, slf)
  }
};

function generateUmlChart(code) {
  try {
    const uri = toUriSync(`@startuml\n${code}\n@enduml`, 'svg')
    return `<p><img src="${uri}" class="markspec plantuml plantuml-uml" alt="uml diagram"></p>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}

function generateDitaaChart(code) {
  try {
    const uri = toUriSync(`@startditaa\n${code}\n@endditaa`, 'png')
    return `<p><img src="${uri}" class="markspec plantuml plantuml-ditaa" alt="ditaa diagram"></p>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}
