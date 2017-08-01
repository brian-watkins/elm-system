
var NextPort = function(routeController) {
  this.name = "next"
  this.executor = function(flags) {
    routeController.handleRequest(flags)
  }
}

module.exports = NextPort
