
var Middleware = function() {

  var workerProgram = null

  this.hasWorkers = function() {
    return (workerProgram != null)
  }

  this.registerWorker = function(worker) {
    workerProgram = worker
  }

  this.handleRequest = function() {
    workerProgram.handleRequest()
  }

}

module.exports = Middleware
