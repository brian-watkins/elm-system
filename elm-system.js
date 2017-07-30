var System = require("./src/system")
var History = require("history")
var Router = require("./src/router")
var WorkerProgramService = require("./src/program/workerProgramService")
var MiddlewareService = require("./src/middlewareService")
var RouteService = require("./src/routeService")
var HtmlProgramService = require("./src/program/htmlProgramService")
var InstanceService = require("./src/program/instanceService")

module.exports = function() {
  var instanceService = new InstanceService()

  var runtime = new Runtime(
    History.createBrowserHistory(),
    new Router(),
    new MiddlewareService(new WorkerProgramService(), instanceService),
    new RouteService(new HtmlProgramService(), instanceService),
    instanceService
  )

  return new System(runtime)
}
