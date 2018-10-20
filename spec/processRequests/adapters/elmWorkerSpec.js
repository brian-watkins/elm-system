var ElmWorker = require("../../../src/processRequests/adapters/ElmWorker")
var ElmProgramDescription = require("../../../src/configuration/ElmProgramDescription")
var { 
  expectProgramCreatedWithFlags, 
  fakeWorkerFrom,
  createCodeSpy
} = require("../../testHelpers")

describe("ElmWorker", function() {
  var fakeCode

  beforeEach(() => {
    fakeCode = createCodeSpy()
  })

  describe("when the program has flags", function() {

    it("passes the flags to the program", function() {
      var programDescription = new ElmProgramDescription(fakeCode, { someFlag: "myFlag" })

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })

      expectProgramCreatedWithFlags(fakeCode, { someFlag: "myFlag", globalFlag: "another" })
    })

  })

  describe("when the program has no flags", function() {

    it("passes the flags to the program", function() {
      var programDescription = new ElmProgramDescription(fakeCode, null)

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })

      expectProgramCreatedWithFlags(fakeCode, { globalFlag: "another" })
    })

  })

  describe("#handleRequest", function() {
    it("sends flags to the request port", function() {
      var fakeWorker = fakeWorkerFrom(fakeCode)

      var programDescription = new ElmProgramDescription(fakeCode)

      var subject = new ElmWorker(programDescription, { globalFlag: "another" })
      subject.handleRequest({someFlag: "myFlag"})

      expect(fakeWorker.requestFlags).toEqual({someFlag: "myFlag"})
    })
  })


})
