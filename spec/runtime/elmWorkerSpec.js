var ElmWorker = require("../../src/processRequests/entities/ElmWorker")
var ElmProgramDescription = require("../../src/configureSystem/ElmProgramDescription")
var FakeWorkerProgram = require("../fakes/fakeWorkerProgram")

describe("ElmWorker", function() {

  describe("when the program has flags", function() {

    it("passes the flags to the program", function() {
      var fakeCode = jasmine.createSpyObj('fakeCode', [ 'worker' ])
      var programDescription = new ElmProgramDescription(fakeCode, { someFlag: "myFlag" })

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })

      expect(fakeCode.worker).toHaveBeenCalledWith({ someFlag: "myFlag", globalFlag: "another" })
    })

  })

  describe("when the program has no flags", function() {

    it("passes the flags to the program", function() {
      var fakeCode = jasmine.createSpyObj('fakeCode', [ 'worker' ])
      var programDescription = new ElmProgramDescription(fakeCode, null)

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })

      expect(fakeCode.worker).toHaveBeenCalledWith({ globalFlag: "another" })
    })

  })

  describe("#handleRequest", function() {
    it("sends null to the request port", function() {
      var fakeCode = jasmine.createSpyObj('fakeCode', [ 'worker' ])

      var fakeWorker = new FakeWorkerProgram()
      fakeCode.worker.and.returnValue(fakeWorker)

      var programDescription = new ElmProgramDescription(fakeCode)

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })
      subject.handleRequest()

      expect(fakeWorker.requestFlags).toBe(null)
    })
  })


})
