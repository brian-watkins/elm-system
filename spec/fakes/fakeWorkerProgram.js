
var FakeWorkerProgram = function() {
  this.nextFunction = null
  this.requestFlags = null
  this.changeLocationFunction = null

  var self = this

  this.ports = {
    request: {
      send: function(flags) {
        self.requestFlags = flags
      }
    },
    next: {
      subscribe: function (f) {
        self.nextFunction = f
      },
      unsubscribe: function(f) {
      }
    },
    changeLocation: {
      subscribe: function (f) {
        self.changeLocationFunction = f
      }
    }
  }
}

module.exports = FakeWorkerProgram
