var RouteController = require('../../src/processRequests/routeController')

describe("RouteController", function() {

  var subject
  var fakeLocation = {
    currentPath: function() { return '/fake-location' }
  }
  var fakeRouter
  var fakeDisplay

  beforeEach(function() {
    fakeRouter = jasmine.createSpyObj('fakeRouter', [ 'match' ])
    fakeDisplay = jasmine.createSpyObj('fakeDisplay', [ 'showRoute' ])

    subject = new RouteController(fakeDisplay, fakeLocation, fakeRouter)
  })

  describe("when the location changes to a matching route", function() {

    var fakeRoute
    var middlewareFlags = { flag: "fake-flag" }

    beforeEach(function() {
      fakeRoute = jasmine.createSpyObj('fakeRoute', [ 'willDisplay' ])
      fakeRouter.match.and.returnValue({
        route: fakeRoute,
        params: { routeParam: "someValue" }
      })

      subject.handleRequest(middlewareFlags)
    })

    it('matches the route', function() {
      expect(fakeRouter.match).toHaveBeenCalledWith('/fake-location')
    })

    it("prepares the route for display with flags from the middleware and the route", function() {
      expect(fakeRoute.willDisplay).toHaveBeenCalledWith({
        flag: "fake-flag",
        routeParam: "someValue"
      })
    })

    it("passes the route to the display", function() {
      expect(fakeDisplay.showRoute).toHaveBeenCalledWith(fakeRoute)
    })

  })

  describe("when the location changes to a non-matching route", function() {

    beforeEach(function() {
      fakeRouter.match.and.returnValue(null)
      subject.handleRequest(null)
    })

    it("does nothing", function() {
      expect(fakeDisplay.showRoute).not.toHaveBeenCalled()
    })

  })

})
