var UrlPattern = require('url-pattern')

var Router = function() {
  var routeInfo = []

  this.add = function(route) {
    var pattern = new UrlPattern(route.path)
    routeInfo.push({pattern: pattern, route: route})
  }

  this.match = function(path) {
    for (var i = 0; i < routeInfo.length; i++) {
      var params = routeInfo[i].pattern.match(path)
      if (params) {
        return { route: routeInfo[i].route, params: params }
      }
    }

    return null;
  }
}

module.exports = Router
