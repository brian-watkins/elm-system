var ProgramService = require("./programService")

var WorkerProgramService = function() {
  this.initialize = function(program, flags) {
    return this.initializeProgram(program.code.worker, program, flags)
  }
}

WorkerProgramService.prototype = new ProgramService()

module.exports = WorkerProgramService
