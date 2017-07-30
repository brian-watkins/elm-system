var _ = require("underscore")

var InstanceService = function() {
  this.notifyRequest = function(instance, flags) {
    instance.ports.request.send(flags)
  }

  this.subscribe = function(instance, name, executor) {
    if (instance.ports && _.has(instance.ports, name)) {
        instance.ports[name].subscribe(executor)
    }
  }
}

module.exports = InstanceService
