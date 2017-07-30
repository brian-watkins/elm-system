
var RouteService = function(htmlProgramService, instanceService) {
  this.mount = function (route, element, flags) {
    return htmlProgramService.initialize(route.program, element, flags)
  }

  this.prepareToShowWithFlags = function(instance, flags) {
    instanceService.notifyRequest(instance, flags)
  }
}

module.exports = RouteService
