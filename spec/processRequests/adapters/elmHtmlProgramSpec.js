var ElmHtmlProgram = require("../../../src/processRequests/adapters/ElmHtmlProgram")
var ElmProgramDescription = require("../../../src/configuration/ElmProgramDescription")
var {
  expectProgramCreatedWithFlags,
  expectProgramMountedAtNode,
  createCodeSpy
} = require("../../testHelpers")

describe("ElmHtmlProgram", function() {
  var fakeCode

  beforeEach(() => {
    fakeCode = createCodeSpy()
  })

  describe("when the program has flags", function() {

    it("passes the flags to the program", function() {
      var programDescription = new ElmProgramDescription(fakeCode, { someFlag: "myFlag" })
      var fakeElement = {}

      var subject = new ElmHtmlProgram(programDescription, { globalFlag: "another" }, fakeElement)

      expectProgramCreatedWithFlags(fakeCode, { someFlag: "myFlag", globalFlag: "another" })
      expectProgramMountedAtNode(fakeCode, fakeElement)
    })

  })

  describe("when the program has no flags", function() {

    it("passes the flags to the program", function() {
      var programDescription = new ElmProgramDescription(fakeCode, null)
      var fakeElement = {}

      var subject = new ElmHtmlProgram(programDescription, { globalFlag: "another" }, fakeElement)

      expectProgramCreatedWithFlags(fakeCode, { globalFlag: "another" })
      expectProgramMountedAtNode(fakeCode, fakeElement)
    })

  })

})
