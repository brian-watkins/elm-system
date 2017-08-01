
var BrowserLocation = function(history) {

  this.listen = function(callback) {
    history.listen(callback)
  }

  this.currentPath = function() {
    return history.location.pathname
  }

  this.push = function(path) {
    history.push(path)
  }
}

module.exports = BrowserLocation
