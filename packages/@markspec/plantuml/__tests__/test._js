const puml = require('../index')


const test = `
@startuml
A-->B: request
B-->A: ack
@enduml`

const toSVGSync = puml.toSVGSync(test)
puml.toSVG(test, (err, toSVG) => {
  if (toSVG != toSVGSync)
    console.warn('error')
  else 
    console.info( toSVG, '\n\nPASS')
})
