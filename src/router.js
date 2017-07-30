var Router = function() {
  this.match = function(path, routes) {
    for (var i = 0; i < routes.length; i++) {
      var params = routes[i].pattern.match(path)
      if (params) {
        return { route: routes[i], params: params }
      }
    }

    return null;
  }
}

module.exports = Router
