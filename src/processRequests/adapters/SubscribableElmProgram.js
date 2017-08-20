var _ = require("underscore")

var SubscribableElmProgram = function(obj, instance) {

  obj.subscribeToCommand = function(command) {
    if (instance.ports && _.has(instance.ports, command.name)) {
      instance.ports[command.name].subscribe(command.executor)
    }
  }

}


module.exports = SubscribableElmProgram
