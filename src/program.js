var _ = require("underscore")

var Program = function (program, flags, configCallback) {
  var instanceFlags = flags
  var instanceConfigure = configCallback
  var instance

  var initialize = function(initializer, flags) {
    instance = initializer(allFlags(flags))

    if (instanceConfigure) {
      instanceConfigure(instance)
    }
  }

  this.initWorker = function(flags) {
    initialize(program.worker, flags)
  }

  this.embed = function(mountNode, flags) {
    initialize(_.partial(program.embed, mountNode), flags)
  }

  this.sendRequest = function(flags) {
    instance.ports.request.send(flags)
  }

  this.subscribeToCommand = function(name, executor) {
    if (instance.ports && _.has(instance.ports, name)) {
        instance.ports[name].subscribe(executor)
    }
  }

  var allFlags = function(flags) {
    return _.extend(flags || {}, instanceFlags)
  }
}

module.exports = Program
