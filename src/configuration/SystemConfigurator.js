var ElmWorker = require("../processRequests/adapters/ElmWorker")
var HtmlRoute = require("../processRequests/adapters/HtmlRoute")

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
      var route = new HtmlRoute(routeDescription)

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
