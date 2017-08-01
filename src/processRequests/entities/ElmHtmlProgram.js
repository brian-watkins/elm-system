var _ = require("underscore")
var SubscribableProgram = require("./SubscribableProgram")

var ElmHtmlProgram = function(programDescription, flags, mountNode) {
  var instance = programDescription.code.embed(mountNode, _.extend(flags || {}, programDescription.flags))
  if (programDescription.configCallback) {
    programDescription.configCallback(instance)
  }

  this.handleRequest = function(flags) {
    instance.ports.request.send(flags)
  }

  SubscribableProgram(this, instance)
}

module.exports = ElmHtmlProgram
