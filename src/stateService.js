var State = require("./state")
var Route = require("./route")

var StateService = function(changeLocationSubscription, nextSubscription, routeService, middleware) {

  //NOTE: Probably want to rename this and split up initialization and Configuration
  //into separate services?

  this.initialize = function(node, config) {
    var state = new State()
    state.mountNode = node
    state.middlewareInstance = mountWorker(config)
    state.routes = mountRoutes(config)
    state.globalFlags = config.globalFlags

    configureRoutes(state)
    if (state.middlewareInstance) {
      configureWorker(state)
    }

    return state
  }

  var mountRoutes = function(config) {
    var routes = []
    config.routes.forEach(function(routeConfig) {
      var element = document.createElement("div")
      element.setAttribute("id", "program-at-" + routeConfig.path)

      //why does routeService.mount return the instance of the program??
      //Shouldn't it return a route?
      //We want to mount the program on an element and we want that element
      //to be tagged in a way associated with the route.
      //And it's just a detail of an HtmlProgram that it needs a document to bind to.
      //so whatever initializes the HtmlProgram should care about that
      var instance = routeService.mount(routeConfig, element, config.globalFlags)

      routes.push(new Route(routeConfig.path, instance, element))
    })

    return routes
  }

  var configureRoutes = function(state) {
    state.routes.forEach(function(route) {
      changeLocationSubscription.subscribe(route.instance)
    })
  }

  var mountWorker = function(config) {
    var middlewareInstance = null

    if (config.middlewareProgram) {
      middlewareInstance = middleware.mount(config.middlewareProgram, config.globalFlags)
    }

    return middlewareInstance
  }

  var configureWorker = function(state) {
    changeLocationSubscription.subscribe(state.middlewareInstance)
    //NOTE: This feels a bit dangerous since now this guy has a reference to the state
    //It would be better if System was the only thing that had a reference to the state
    nextSubscription.subscribe(state.middlewareInstance, state)
  }
}

module.exports = StateService
