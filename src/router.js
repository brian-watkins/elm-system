var UrlPattern = require('url-pattern')

var Router = function() {
  var routes = []

  this.add = function(route) {
    var pattern = new UrlPattern(route.path)
    routes.push({pattern: pattern, route: route})
  }

  this.match = function(path) {
    for (var i = 0; i < routes.length; i++) {
      var params = routes[i].pattern.match(path)
      if (params) {
        return { route: routes[i].route, params: params }
      }
    }

    return null;
  }
}

module.exports = Router
