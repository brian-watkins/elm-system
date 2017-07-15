var Program = require("./program")

var Route = function(path) {
  this.path = path
  this.element = null
  var elm = null
  var embeddedProgram = null

  this.program = function(elmProgram, flags, configCallback) {
    elm = new Program(elmProgram, flags, configCallback)
  }

  this.mount = function (flags, configCallback) {
    this.element = document.createElement("div")
    this.element.setAttribute("id", "program-at-" + this.path)

    embeddedProgram = elm.embed(this.element, flags)

    if (configCallback) {
      configCallback(embeddedProgram)
    }
  }

  this.prepareToShowWithFlags = function(flags) {
    embeddedProgram.ports.request.send(flags)
  }
}

module.exports = Route
