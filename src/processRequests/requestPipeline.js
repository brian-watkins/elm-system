
var RequestPipeline = function(location, middleware, routeController) {
  this.dispatch = function() {
    if (middleware.hasWorkers()) {
      middleware.handleRequest()
    } else {
      routeController.handleRequest(null)
    }
  }

  location.listen(this.dispatch)
}

module.exports = RequestPipeline
