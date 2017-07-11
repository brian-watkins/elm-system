var _ = require("underscore")

var PortCommand = function(name, executor) {
  this.name = name
  this.executor = executor

  this.attachTo = function(program) {
    if (program && program.ports && _.has(program.ports, this.name)) {
      program.ports[this.name].subscribe(this.executor)
    }
  }
}

module.exports = PortCommand
