var RequestPipeline = require("../../src/processRequests/requestPipeline")

describe("RequestPipeline", function() {

  var subject
  var fakeMiddleware
  var fakeRouteInteractor
  var fakeLocation = {
    listen: function(callback) {
      this.callback = callback
    }
  }

  describe("when the location is updated", function() {

    beforeEach(function() {
      fakeMiddleware = jasmine.createSpyObj('fakeMiddleware', [ 'handleRequest', 'hasWorkers' ])
      fakeRouteInteractor = jasmine.createSpyObj('fakeRouteInteractor', [ 'handleRequest' ])

      subject = new RequestPipeline(fakeLocation, fakeMiddleware, fakeRouteInteractor)
    })

    describe("when there are middleware workers", function() {
      beforeEach(function() {
        fakeMiddleware.hasWorkers.and.returnValue(true)
        fakeLocation.callback()
      })

      it("notifies the middleware", function() {
        expect(fakeMiddleware.handleRequest).toHaveBeenCalled()
      })
    })

    describe("when there are no middleware workers", function() {
      beforeEach(function() {
        fakeMiddleware.hasWorkers.and.returnValue(false)
        fakeLocation.callback()
      })

      it("notifies the routeInteractor", function() {
        expect(fakeRouteInteractor.handleRequest).toHaveBeenCalledWith(null)
      })
    })


  })

})
