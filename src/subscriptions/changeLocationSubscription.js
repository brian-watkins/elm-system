
var ChangeLocationSubscription = function(history, instanceService) {
  this.subscribe = function(instance) {
      instanceService.subscribe(instance, "changeLocation", function(path) {
        history.push(path)
      })
    }
}

module.exports = ChangeLocationSubscription
