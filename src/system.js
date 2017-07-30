var RouteConfig = require("./routeConfig")
var Program = require("./program")
var Configuration = require("./configuration")

//This should really be a SystemConfigurator
var System = function (history, stateService, runtime) {
  var config = new Configuration()

  this.useFlags = function(flags) {
    config.globalFlags = flags
  }

  this.useProgram = function(code, flags, configCallback) {
    config.middlewareProgram = new Program(code, flags, configCallback)
  }

  this.route = function (path) {
    var routeConfig = new RouteConfig(path)
    config.routes.push(routeConfig)

    return routeConfig
  }

  //This should just initialize the runtime object with the config
  //runtime can hold its own state and register with the history, etc
  //OR there's something that initializes the state of the system and
  //passes that to the runtime. Runtime shouldn't care about starting
  //things up, just handling things once the system is ready.

  //The runtime needs a router (which contains the list of routes),
  //a location service, and a middleware (which contains the middleware programs),
  //also a display (which knows about the mountNode and how to show/display nodes)
  //The entities are Route, MiddlewareProgram, RouteProgram
  //Maybe don't try to put together the HtmlProgram and the WorkerProgram, just
  //have some ElmService that knows how to do things?

  //RunTime is kind of like an interactor.
  //SystemConfigurator is another interactor. It deals with different entities:
  //routeConfig and programConfig. You can create
  //a route and a program given these objects.

  //what about display on a web page? Isn't that a detail?
  //But maybe a library is different from an application.

  this.mount = function(node) {
    var state = stateService.initialize(node, config)

    history.listen(function() {
      runtime.updateRoute(state)
    })

    runtime.updateRoute(state)
  }
}

module.exports = System
