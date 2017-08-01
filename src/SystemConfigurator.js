var ElmWorker = require("./processRequests/entities/ElmWorker")
var Route = require("./processRequests/entities/Route")

var SystemConfigurator = function(htmlDocument, router, middleware, display, changeLocationPort, nextPort) {

  this.configure = function(config) {
    display.rootElement = config.rootElement

    if (config.middlewareDescription) {
      var worker = new ElmWorker(config.middlewareDescription, config.globalFlags)
      worker.subscribeToCommand(changeLocationPort)
      worker.subscribeToCommand(nextPort)
      middleware.registerWorker(worker)
    }

    config.routeDescriptions.forEach(function(routeDescription) {
      var route = new Route(routeDescription)

      var element = htmlDocument.createElement("div")
      element.setAttribute("id", route.path)

      route.mount(element, config.globalFlags, function(htmlProgram) {
        htmlProgram.subscribeToCommand(changeLocationPort)
      })

      router.add(route)
    })
  }

}

module.exports = SystemConfigurator
