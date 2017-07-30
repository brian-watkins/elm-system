var ProgramService = require("./programService")
var _ = require("underscore")

var HtmlProgramService = function() {
  this.initialize = function(program, mountNode, flags) {
    return this.initializeProgram(_.partial(program.code.embed, mountNode), program, flags)
  }
}

HtmlProgramService.prototype = new ProgramService()

module.exports = HtmlProgramService
