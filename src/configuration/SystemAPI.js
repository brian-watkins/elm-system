var _ = require("underscore")
var SystemConfigurator = require("./SystemConfigurator")
var SystemConfiguration = require("./SystemConfiguration")
var ElmProgramDescription = require("./ElmProgramDescription")
var RouteDescription = require("./RouteDescription")
var Router = require("../processRequests/router")
var Middleware = require("../processRequests/middleware")
var HtmlDisplay = require("../processRequests/adapters/HtmlDisplay")
var ChangeLocationCommand = require("../processRequests/commands/ChangeLocationCommand")
var NextCommand = require("../processRequests/commands/NextCommand")
var BrowserLocation = require("../processRequests/adapters/BrowserLocation")
var RouteController = require("../processRequests/routeController")
var RequestPipeline = require("../processRequests/requestPipeline")

var System = function (history, htmlDocument) {
  var config = new SystemConfiguration()

  var router = new Router()
  var middleware = new Middleware()
  var display = new HtmlDisplay()
  var location = new BrowserLocation(history)
  var changeLocationCommand = new ChangeLocationCommand(location)
  var routeController = new RouteController(display, location, router)
  var nextCommand = new NextCommand(routeController)
  var systemConfigurator = new SystemConfigurator(htmlDocument, router, middleware, display, changeLocationCommand, nextCommand)
  var requestPipeline = new RequestPipeline(location, middleware, routeController)

  this.useFlags = function(flags) {
    config.globalFlags = flags
  }

  this.useProgram = function(code, flags, configCallback) {
    config.middlewareDescription = new ElmProgramDescription(code, flags, configCallback)
  }

  this.route = function (path) {
    var route = new RouteDescription(path)
    config.routeDescriptions.push(route)
    return route
  }

  this.mount = function(node) {
    config.rootElement = node
    systemConfigurator.configure(config)
    requestPipeline.dispatch()
  }
}

module.exports = System
