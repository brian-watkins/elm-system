var Program = require("./program")

var Route = function(path) {
  this.path = path
  this.element = null
  var routeProgram = null

  this.program = function(elmProgram, flags, configCallback) {
    routeProgram = new Program(elmProgram, flags, configCallback)
  }

  this.mount = function (flags, systemConfigure) {
    this.element = document.createElement("div")
    this.element.setAttribute("id", "program-at-" + this.path)

    routeProgram.embed(this.element, flags)

    if (systemConfigure) {
      systemConfigure(routeProgram)
    }
  }

  this.prepareToShowWithFlags = function(flags) {
    routeProgram.sendRequest(flags)
  }
}

module.exports = Route
