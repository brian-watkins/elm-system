var Program = require("./program")

var RouteConfig = function(path) {
  this.path = path
  this.program = null

  this.program = function(elmProgram, flags, configCallback) {
    this.program = new Program(elmProgram, flags, configCallback)
  }
}

module.exports = RouteConfig
