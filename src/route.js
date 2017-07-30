var UrlPattern = require('url-pattern')

var Route = function(path, instance, element) {
  this.pattern = new UrlPattern(path)
  this.instance = instance
  this.element = element
}

module.exports = Route
