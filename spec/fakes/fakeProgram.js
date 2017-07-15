
var FakeProgram = function () {
  this.changeLocationFunction = null
  this.requestFlags = null

  var self = this

  this.ports = {
    request: {
      send: function(flags) {
        self.requestFlags = flags
      }
    },
    changeLocation: {
      subscribe: function (portFunction) {
        self.changeLocationFunction = portFunction
      }
    }
  }
}

module.exports = FakeProgram
