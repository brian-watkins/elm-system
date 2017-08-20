var HtmlDisplay = require("../../../src/processRequests/adapters/HtmlDisplay")

var FakeHtmlElement = function() {
  this.firstElementChild = null
  this.didCallRemove = false

  this.removeChild = function(child) {
    this.didCallRemove = true
    this.childToRemove = child
  }

  this.appendChild = function(child) {
    this.childToAppend = child
  }
}

describe("HtmlDisplay", function() {

  var subject
  var fakeMountElement
  var fakeRouteElement = {}

  var fakeRoute = {
    path: "/my-path",
    element: fakeRouteElement
  }

  beforeEach(function() {
    fakeMountElement = new FakeHtmlElement()
    subject = new HtmlDisplay()
    subject.rootElement = fakeMountElement
  })

  describe("#showRoute", function() {

    describe("when there is a child", function() {
      var firstChild = {}

      beforeEach(function() {
        fakeMountElement.firstElementChild = firstChild
      })

      it("removes the first (and only) route node from the root", function() {
        subject.showRoute(fakeRoute)
        expect(fakeMountElement.didCallRemove).toBe(true)
        expect(fakeMountElement.childToRemove).toBe(firstChild)
      })
    })

    describe("when there is not a child", function() {
      it("does not attempt to remove it", function() {
        subject.showRoute(fakeRoute)
        expect(fakeMountElement.didCallRemove).toBe(false)
      })
    })

    it("appends the node for the route", function() {
      subject.showRoute(fakeRoute)
      expect(fakeMountElement.childToAppend).toBe(fakeRouteElement)
    })
  })

})
