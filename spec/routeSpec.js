var Route = require("../src/route.js")

describe("route", function() {
  var subject
  var elmProgram

  beforeEach(function () {
    subject = new Route("/path")
    elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
  })

  it("associates a program with the route", function() {
    subject.program(elmProgram)
    subject.mount({})

    expect(elmProgram.embed).toHaveBeenCalled()
  })

  it("associates the flags with the program", function() {
    var flags = { myFlag: "flag" }
    subject.program(elmProgram, flags)
    subject.mount({})

    expect(elmProgram.embed).toHaveBeenCalledWith({}, flags)
  })

  it("allows the embedded program to be configured", function() {
    var embeddedApp = {}
    elmProgram.embed.and.returnValue(embeddedApp)

    var configCallback = jasmine.createSpy('configCallback')
    subject.program(elmProgram, null, configCallback)
    subject.mount({})

    expect(configCallback).toHaveBeenCalledWith(embeddedApp)
  })
})
