var _ = require("underscore")

var Program = function (elm, flags, configCallback) {
  this.elm = elm
  this.flags = flags
  this.configure = configCallback

  this.worker = function(flags) {
    var worker = this.elm.worker(allFlags(flags))

    if (this.configure) {
      this.configure(worker)
    }

    return worker
  }

  this.embed = function(mountNode, flags) {
    var embeddedProgram = this.elm.embed(mountNode, allFlags(flags))
    if (this.configure) {
      this.configure(embeddedProgram)
    }
    return embeddedProgram
  }

  var self = this

  var allFlags = function(flags) {
    return _.extend(flags || {}, self.flags)
  }
}

module.exports = Program
