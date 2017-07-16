
var Middleware = function(program) {
  this.mount = function(flags, callback) {
    program.initWorker(flags)
    callback(program)
  }

  this.sendRequest = function(flags) {
    program.sendRequest(flags)
  }
}

module.exports = Middleware
