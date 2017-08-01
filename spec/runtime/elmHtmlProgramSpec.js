var ElmHtmlProgram = require("../../src/processRequests/entities/ElmHtmlProgram")
var ElmProgramDescription = require("../../src/configureSystem/ElmProgramDescription")

describe("ElmHtmlProgram", function() {

  describe("when the program has flags", function() {

    it("passes the flags to the program", function() {
      var fakeCode = jasmine.createSpyObj('fakeCode', [ 'embed' ])
      var programDescription = new ElmProgramDescription(fakeCode, { someFlag: "myFlag" })
      var fakeElement = {}

      var subject = new ElmHtmlProgram(programDescription, { globalFlag: "another" }, fakeElement)

      expect(fakeCode.embed).toHaveBeenCalledWith(fakeElement, { someFlag: "myFlag", globalFlag: "another" })
    })

  })

  describe("when the program has no flags", function() {

    it("passes the flags to the program", function() {
      var fakeCode = jasmine.createSpyObj('fakeCode', [ 'embed' ])
      var programDescription = new ElmProgramDescription(fakeCode, null)
      var fakeElement = {}

      var subject = new ElmHtmlProgram(programDescription, { globalFlag: "another" }, fakeElement)

      expect(fakeCode.embed).toHaveBeenCalledWith(fakeElement, { globalFlag: "another" })
    })

  })


})
