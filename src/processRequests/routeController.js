var _ = require('underscore')

var RouteController = function(display, location, router) {
  this.handleRequest = function(flags) {
    var match = router.match(location.currentPath())
    if (match) {
      displayRoute(match.route, match.params, flags)
    }
  }

  var displayRoute = function(route, routeParams, middlewareFlags) {
    route.willDisplay(_.extend(routeParams, middlewareFlags))
    display.showRoute(route)
  }
}

module.exports = RouteController
