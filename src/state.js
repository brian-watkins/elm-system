
var State = function() {
  this.mountNode = null
  this.currentRouteElement = null
  this.middlewareInstance = null
  this.routes = []
  this.globalFlags = null
}

module.exports = State
