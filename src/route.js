var Program = require("./program")

var Route = function(path) {
  this.path = path
  this.program = null

  this.program = function(elmProgram, flags, configCallback) {
    this.program = new Program(elmProgram, flags, configCallback)
  }

  this.mount = function (mountNode, flags, configCallback) {
    var embeddedProgram = this.program.embed(mountNode, flags)
    if (configCallback) {
      configCallback(embeddedProgram)      
    }
  }
}

module.exports = Route
