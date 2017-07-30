
var NextSubscription = function(instanceService, runtime) {
  this.subscribe = function(instance, state) {
    instanceService.subscribe(instance, "next", function(flags) {
      runtime.dispatch(state, flags)
    })
  }
}

module.exports = NextSubscription
