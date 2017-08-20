var ElmProgramDescription = require("./ElmProgramDescription")

var RouteDescription = function(path) {
  this.path = path
  this.programDescription = null

  this.program = function(code, flags, callback) {
    this.programDescription = new ElmProgramDescription(code, flags, callback)
  }
}

module.exports = RouteDescription
