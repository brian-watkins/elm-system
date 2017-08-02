var _ = require("underscore")
var SubscribableElmProgram = require("./SubscribableElmProgram")

var ElmWorker = function(programDescription, flags) {
  var instance = programDescription.code.worker(_.extend(flags || {}, programDescription.flags))

  if (programDescription.configCallback) {
    programDescription.configCallback(instance)
  }

  this.handleRequest = function() {
    instance.ports.request.send(null)
  }

  SubscribableElmProgram(this, instance)
}

module.exports = ElmWorker
