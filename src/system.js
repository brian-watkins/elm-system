var _ = require("underscore")
var Router = require("./router")
var Route = require("./route")
var PortCommand = require("./portCommand")

var System = function (history) {
  var self = this
  this.mountNode = null
  var router = new Router()

  this.useFlags = function(flags) {
    this.globalFlags = flags
  }

  this.route = function (path) {
    var route = new Route(path)
    router.add(route)

    return route
  }

  this.mount = function(node) {
    this.mountNode = node
    updateRoute(history.location)
  }

  history.listen(function(location, action) {
    updateRoute(location)
  })

  var updateRoute = function(location) {
    var match = router.match(location.pathname)
    if (match) {
      var flags = _.extend(self.globalFlags || {}, match.params)
      match.route.mount(self.mountNode, flags, function(program) {
        var changeLocationCommand = new PortCommand("changeLocation", function(path) {
          history.push(path)
        })
        changeLocationCommand.attachTo(program)
      })
    }
  }
}

module.exports = System
