
var MiddlewareService = function(workerProgramService, instanceService) {
  this.mount = function(program, flags) {
    return workerProgramService.initialize(program, flags)
  }

  this.notifyRequest = function(instance, flags) {
    instanceService.notifyRequest(instance, flags)
  }
}

module.exports = MiddlewareService
