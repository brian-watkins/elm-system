var _ = require("underscore")
var Router = require("./router")
var Route = require("./route")
var Program = require("./program")
var Middleware = require("./middleware")

var System = function (history) {
  var mountNode = null
  var middleware = null
  var router = new Router()
  var globalFlags = null
  var currentRouteElement = null

  this.useFlags = function(flags) {
    globalFlags = flags
  }

  this.useProgram = function(elmProgram, flags, configCallback) {
    middleware = new Middleware(new Program(elmProgram, flags, configCallback))
  }

  this.route = function (path) {
    var route = new Route(path)
    router.add(route)

    return route
  }

  this.mount = function(node) {
    mountNode = node

    mountWorker()

    mountRoutes()

    history.listen(function(location, action) {
      updateRoute()
    })

    updateRoute()
  }

  var mountRoutes = function() {
    router.routes().forEach(function(route) {
      route.mount(globalFlags, function(program) {
        subscribeToChangeLocation(program)
      })
    })
  }

  var mountWorker = function() {
    if (middleware) {
      middleware.mount(globalFlags, function(program) {
        subscribeToChangeLocation(program)
        subscribeToNext(program)
      })
    }
  }

  var updateRoute = function() {
    if (middleware) {
      middleware.sendRequest(globalFlags)
    } else {
      dispatch()
    }
  }

  var subscribeToChangeLocation = function(program) {
    program.subscribeToCommand("changeLocation", function(path) {
      history.push(path)
    })
  }

  var subscribeToNext = function(program) {
    program.subscribeToCommand("next", function(flags) {
      dispatch(flags)
    })
  }

  dispatch = function(flags) {
    var match = router.match(history.location.pathname)
    if (match) {
      match.route.prepareToShowWithFlags(_.extend(match.params, flags))
      showRoute(match.route.element)
    }
  }

  var showRoute = function(element) {
    if (currentRouteElement) {
      mountNode.removeChild(currentRouteElement)
    }
    mountNode.appendChild(element)
    currentRouteElement = element
  }
}

module.exports = System
