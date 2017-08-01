var _ = require("underscore")
var SystemConfigurator = require("./SystemConfigurator")
var SystemConfiguration = require("./configureSystem/SystemConfiguration")
var ElmProgramDescription = require("./configureSystem/ElmProgramDescription")
var RouteDescription = require("./configureSystem/RouteDescription")
var Router = require("./processRequests/router")
var Middleware = require("./processRequests/middleware")
var HtmlDisplay = require("./htmlDisplay")
var ChangeLocationPort = require("./processRequests/entities/ChangeLocationPort")
var NextPort = require("./processRequests/entities/NextPort")
var BrowserLocation = require("./browserLocation")
var RouteController = require("./processRequests/routeController")
var RequestPipeline = require("./processRequests/requestPipeline")

var System = function (history, htmlDocument) {
  var config = new SystemConfiguration()

  var router = new Router()
  var middleware = new Middleware()
  var display = new HtmlDisplay()
  var location = new BrowserLocation(history)
  var changeLocationPort = new ChangeLocationPort(location)
  var routeController = new RouteController(display, location, router)
  var nextPort = new NextPort(routeController)
  var systemConfigurator = new SystemConfigurator(htmlDocument, router, middleware, display, changeLocationPort, nextPort)
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
