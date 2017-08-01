var BrowserLocation = require("../src/browserLocation")
var History = require("history")

describe("BrowserLocation", function() {

  var subject
  var fakeHistory

  beforeEach(function() {
    fakeHistory = History.createMemoryHistory({
      initialEntries: [ '/current-route' ],
      initialIndex: 0
    })

    subject = new BrowserLocation(fakeHistory)
  })

  describe("#listen", function() {

    it("calls the callback when the history changes", function() {
      var locationListener = jasmine.createSpy()
      subject.listen(locationListener)

      fakeHistory.push("/another-route")

      expect(locationListener).toHaveBeenCalled()
    })

  })

  describe("#currentPath", function() {

    it("returns the current path", function() {
      expect(subject.currentPath()).toEqual("/current-route")
    })

  })

})
