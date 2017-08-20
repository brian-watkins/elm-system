
var HtmlDisplay = function() {
  this.rootElement = null

  this.showRoute = function(route) {
    if (this.rootElement.firstElementChild) {
      this.rootElement.removeChild(this.rootElement.firstElementChild)
    }
    
    this.rootElement.appendChild(route.element)
  }

}

module.exports = HtmlDisplay
