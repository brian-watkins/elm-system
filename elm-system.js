var SystemAPI = require("./src/configuration/SystemAPI")
var History = require("history")

module.exports = function() {
  return new SystemAPI(History.createBrowserHistory(), document)
}
