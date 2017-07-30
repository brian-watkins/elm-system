var _ = require("underscore")

var ProgramService = function() {
  this.initializeProgram = function(initializer, program, flags) {
    var instance = initializer(_.extend(flags || {}, program.flags))

    if (program.configCallback) {
      program.configCallback(instance)
    }

    return instance
  }
}



module.exports = ProgramService
