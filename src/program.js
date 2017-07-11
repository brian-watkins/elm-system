var _ = require("underscore")

var Program = function (elm, flags, configCallback) {
  this.elm = elm
  this.flags = flags
  this.configure = configCallback

  this.embed = function(mountNode, flags) {
    var embeddedProgram = this.elm.embed(mountNode, _.extend(flags || {}, this.flags))
    if (this.configure) {
      this.configure(embeddedProgram)
    }
    return embeddedProgram
  }
}

module.exports = Program
