var _ = require("underscore")
var SubscribableElmProgram = require("./SubscribableElmProgram")

var ElmWorker = function(programDescription, flags) {
  var instance = programDescription.code.init({
    flags: _.extend(flags || {}, programDescription.flags)
  })

  if (programDescription.configCallback) {
    programDescription.configCallback(instance)
  }

  this.handleRequest = function(flags) {
    instance.ports.request.send(flags)
  }

  SubscribableElmProgram(this, instance)
}

module.exports = ElmWorker
