var SystemAPI = require("./src/htmlSystem/configuration/SystemAPI")
var History = require("history")

module.exports = function() {
  return new SystemAPI(History.createBrowserHistory(), document)
}
