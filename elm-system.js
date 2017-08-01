var System = require("./src/system")
var History = require("history")

module.exports = function() {
  return new System(History.createBrowserHistory(), document)
}
