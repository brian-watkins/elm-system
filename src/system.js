var _ = require("underscore")
var Router = require("./router")
var Route = require("./route")
var Program = require("./program")
var PortCommand = require("./portCommand")
var Middleware = require("./middleware")

var System = function (history) {
  var mountNode = null
  var middleware = null
  var worker = null
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
        changeLocationCommand().attachTo(program)
      })
    })
  }

  var mountWorker = function() {
    if (middleware) {
      middleware.mount(globalFlags, function(worker) {
        changeLocationCommand().attachTo(worker)
        nextCommand().attachTo(worker)
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

  var changeLocationCommand = function() {
    return new PortCommand("changeLocation", function(path) {
      history.push(path)
    })
  }

  var nextCommand = function() {
    return new PortCommand("next", function(flags) {
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
