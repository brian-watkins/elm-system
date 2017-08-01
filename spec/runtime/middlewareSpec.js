var Middleware = require("../../src/processRequests/middleware")

describe("middlware", function() {

  var subject
  var fakeWorker

  beforeEach(function() {
    subject = new Middleware()
  })

  describe("when a worker is registered", function() {
    beforeEach(function() {
      fakeWorker = jasmine.createSpyObj('fakeWorker', [ 'handleRequest' ])
      subject.registerWorker(fakeWorker)
    })

    it("tells the worker to handle the request", function() {
      subject.handleRequest()

      expect(fakeWorker.handleRequest).toHaveBeenCalled()
    })

    it("has workers", function() {
      expect(subject.hasWorkers()).toBeTruthy()
    })
  })

  describe("when a worker is not registered", function() {
    it("has no workers", function() {
      expect(subject.hasWorkers()).toBe(false)
    })
  })



})
