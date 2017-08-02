
var ChangeLocationPort = function(location) {
  this.name = "changeLocation"
  this.executor = function(path) {
    location.push(path)
  }
}

module.exports = ChangeLocationPort
