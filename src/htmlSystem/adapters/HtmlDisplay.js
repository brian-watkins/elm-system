
var HtmlDisplay = function() {
  this.rootElement = null

  this.showRoute = function(route) {
    if (this.rootElement.firstChild) {
      this.rootElement.removeChild(this.rootElement.firstChild)
    }
    this.rootElement.appendChild(route.element)
  }

}

module.exports = HtmlDisplay
