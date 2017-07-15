
var FakeElement = function(tag) {
  this.tag = tag
  this.attributes = {}
  this.childToAppend = null
  this.childToRemove = null

  this.setAttribute = function(name, value) {
    this.attributes[name] = value
  }

  this.appendChild = function(newChild) {
    this.childToAppend = newChild
  }

  this.removeChild = function(removeChild) {
    this.childToRemove = removeChild
  }
}

module.exports = FakeElement
