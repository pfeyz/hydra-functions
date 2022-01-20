const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')
const hydraTypes = require('./types.js')
const examples = require('./examples.js')

const formattedFunctionGroups = []

Object.entries(hydraTypes).map(([type, val], typeIndex) => {
  const formattedFunctionGroup = { type, val, typeIndex, funcs: [] }
  const sortedObjList = hydraFunctions.filter((obj) => obj.type === type).sort((a, b) => a.name - b.name)
  sortedObjList.map((obj, index) => {
    if (examples[obj.name] === undefined) {
      // functions that are not documented
      obj.undocumented = true
    }
    obj.typeIndex = typeIndex
    formattedFunctionGroup.funcs.push(obj)
  })
  formattedFunctionGroups.push(formattedFunctionGroup)
})

function getExamples(name) {
  let ref = examples[name]
  if (ref === undefined) {
    return []
  }
  if (ref.example === undefined) {
    return []
  }
  if (Array.isArray(ref.example) === false) {
    return [ref.example]
  }
  return ref.example
}

module.exports = { formattedFunctionGroups, getExamples }