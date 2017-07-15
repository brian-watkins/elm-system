
var Middleware = function(program) {
  var elm = program
  var worker

  this.mount = function(flags, callback) {
    worker = elm.worker(flags)
    callback(worker)
  }

  this.sendRequest = function(flags) {
    worker.ports.request.send(flags)
  }
}

module.exports = Middleware
