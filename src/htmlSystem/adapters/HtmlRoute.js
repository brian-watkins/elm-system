var ElmHtmlProgram = require("./ElmHtmlProgram")

var Route = function(routeDescription) {

  this.element = null
  this.path = routeDescription.path
  var program = null

  this.mount = function(element, initFlags, callback) {
    this.element = element
    program = new ElmHtmlProgram(routeDescription.programDescription, initFlags, element)
    callback(program)
  }

  this.willDisplay = function(flags) {
    program.handleRequest(flags)
  }

}

module.exports = Route
