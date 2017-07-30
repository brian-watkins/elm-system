var Route = require("../src/route.js")
var FakeElement = require("./fakes/fakeElement.js")

xdescribe("route", function() {
  var subject
  var elmProgram

  beforeEach(function () {
    document = jasmine.createSpyObj("document", [ "createElement" ])
    document.createElement.and.callFake(function(tag) {
      return new FakeElement(tag)
    })

    subject = new Route("/path")
    elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
  })

  it("associates a program with the route", function() {
    subject.program(elmProgram)
    subject.mount()

    expect(elmProgram.embed).toHaveBeenCalled()
  })

  it("associates the flags with the program", function() {
    var flags = { myFlag: "flag" }
    subject.program(elmProgram, flags)
    subject.mount({ anotherFlag: "anotherFlag" })

    expect(elmProgram.embed.calls.mostRecent().args[1]).toEqual({
      myFlag: "flag",
      anotherFlag: "anotherFlag"
    })
  })

  it("allows the embedded program to be configured", function() {
    var embeddedApp = {}
    elmProgram.embed.and.returnValue(embeddedApp)

    var configCallback = jasmine.createSpy('configCallback')
    subject.program(elmProgram, null, configCallback)
    subject.mount()

    expect(configCallback).toHaveBeenCalledWith(embeddedApp)
  })
})
