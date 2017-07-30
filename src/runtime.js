var _ = require("underscore")
var Route = require("./route")

var Runtime = function(history, router, routeService, instanceService) {

  this.updateRoute = function(state) {
    if (state.middlewareInstance) {
      //maybe here you could pass in a function that's called when the request is finished?
      //but that's kind of complicated by the fact that the finish notification
      //is in a separate port
      instanceService.notifyRequest(state.middlewareInstance, state.globalFlags)
    } else {
      this.dispatch(state)
    }
  }

  //dispatch really needs mountNode and routes. we should be able to
  //not store the currentRouteElement somehow

  //Maybe in some ways though, the details of the program, how it communicates
  //with the elm world, are a low-level detail, not the high-level policy that
  //should be in the domain ... 

  this.dispatch = function(state, flags) {
    var match = router.match(history.location.pathname, state.routes)
    if (match) {
      routeService.prepareToShowWithFlags(match.route.instance, _.extend(match.params, flags))
      showRoute(match.route.element, state)
    }
  }

  //SIDE EFFECT on the state
  //NOTE: If we could get rid of this, then I don't think there would be any
  //change to the state at all ...
  var showRoute = function(element, state) {
    if (state.currentRouteElement) {
      state.mountNode.removeChild(state.currentRouteElement)
    }
    state.mountNode.appendChild(element)
    state.currentRouteElement = element
  }

}

module.exports = Runtime
