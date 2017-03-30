'use strict'

var extend = require('xtend')
var lifecycle = require('./lifecycle')

module.exports = extend(lifecycle)

module.exports.atObjectPath = (path) => {
  path = path.split ? path.split('.') : path
  var lastKey = path[path.length - 1]

  return Object.keys(lifecycle).reduce(function (acc, method) {
    acc[method] = function wrapped (object, arg) {
      var newObject = extend(object)
      var current = newObject

      for (var i = 0; i < path.length - 1; i++) {
        var key = path[i]
        current[key] = extend(current[key])
        current = current[key]
      }

      current[lastKey] = lifecycle[method](current[lastKey], arg)

      return newObject
    }

    return acc
  }, {})
}
