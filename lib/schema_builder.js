const { loadContent } = require('./utils')
const Schema = require('validate')

const buildSchema = (schemaPath) => {
  const schemaJson = loadContent(schemaPath)
  return new Schema(_convertToJS(schemaJson))
}

// private methods

const _convertToJS = (object) => { 
  let result = object instanceof Array ? [] : {}
  for(key in object) {
    const isObject = typeof object[key] === 'object'
    result[key] = isObject ? _convertToJS(object[key]) : (TYPE_MAPPER[object[key]] || object[key])
  }
  return result;
}

const TYPE_MAPPER = {
  'string': String,
  'number': Number,
  'boolean': Boolean,
}

module.exports = buildSchema
