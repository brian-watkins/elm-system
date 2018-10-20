var History = require("history")
var System = require("../src/configuration/SystemAPI")
var FakeElement = require("./fakes/fakeElement")
var {
  fakeProgramFrom,
  fakeWorkerFrom,
  createCodeSpy,
  expectProgramMountedAtNodeWithId,
  expectProgramCreatedWithFlags
} = require("./testHelpers")

describe("System", function () {
  var subject
  var fakeHistory
  var mountNode
  var elmProgram, anotherElmProgram
  var fakeProgram

  beforeEach(function() {
    var htmlDocument = jasmine.createSpyObj("document", [ "createElement" ])
    htmlDocument.createElement.and.callFake(function(tag) {
      return new FakeElement(tag)
    })

    fakeHistory = History.createMemoryHistory({
      initialEntries: [ '/current-route' ],
      initialIndex: 0
    })

    mountNode = new FakeElement("div")

    elmProgram = createCodeSpy()
    fakeProgram = fakeProgramFrom(elmProgram)

    anotherElmProgram = createCodeSpy()
    fakeProgramFrom(anotherElmProgram)

    subject = new System(fakeHistory, htmlDocument);
  })

  describe("#mount", function() {
    var expectedMountNode

    beforeEach(function() {
      subject.route("/another-route").program(anotherElmProgram)
      subject.route("/current-route").program(elmProgram)
      subject.mount(mountNode)
    })

    it("embeds all the registered programs in their own nodes", function() {
      expectProgramMountedAtNodeWithId(elmProgram, "/current-route")
      expectProgramMountedAtNodeWithId(anotherElmProgram, "/another-route")
    })

    it("makes the element associated with the program at the current route a child of the mount node", function() {
      expect(mountNode.childToAppend.attributes.id).toBe("/current-route")
    })
  })

  describe("when the program has a port for changeLocation", function() {
    it("changes the history when the port command is received", function() {
      var embeddedProgram = fakeProgramFrom(elmProgram)

      subject.route("/current-route").program(elmProgram)
      subject.mount(mountNode)

      embeddedProgram.changeLocationFunction("/some-new-location")

      expect(fakeHistory.location.pathname).toEqual("/some-new-location")
    })
  })

  describe("#useFlags", function() {
    it("passes the flags to all programs", function () {
      var flags = { myFlag: "flag" }

      subject.useFlags(flags)
      subject.route("/current-route").program(elmProgram)
      subject.mount(mountNode)

      expectProgramCreatedWithFlags(elmProgram, flags)
    })
  })

  describe("#useProgram", function() {
    var elmWorker, fakeWorker

    beforeEach(function () {
      elmWorker = createCodeSpy()
      fakeWorker = fakeWorkerFrom(elmWorker)
    })

    describe("when the system is mounted", function() {
      describe("when the program has no flags", function () {
        it("starts the program", function() {
          subject.useProgram(elmWorker)

          subject.mount(mountNode)

          expectProgramCreatedWithFlags(elmWorker, {})
        })
      })

      describe("when the program has a port for changeLocation", function() {
        it("changes the history when the port command is received", function() {
          var fakeWorker = fakeWorkerFrom(elmWorker)

          subject.useProgram(elmWorker)
          subject.mount(mountNode)

          fakeWorker.changeLocationFunction("/some-new-location")

          expect(fakeHistory.location.pathname).toEqual("/some-new-location")
        })
      })

      describe("when there are flags for the program", function () {
        it("passes the flags to the program", function () {
          var flags = { myFlag: "flag" }
          subject.useProgram(elmWorker, flags)

          subject.mount(mountNode)

          expectProgramCreatedWithFlags(elmWorker, flags)
        })
      })

      describe("when there are global flags", function () {
        it("passes the global flags to the program", function () {
          var flags = { myFlag: "flag" }
          subject.useFlags(flags)
          subject.useProgram(elmWorker)

          subject.mount(mountNode)

          expectProgramCreatedWithFlags(elmWorker, flags)
        })

        it("passes both global and program flags to the program", function () {
          var flags = { myFlag: "flag" }
          subject.useFlags(flags)
          subject.useProgram(elmWorker, { anotherFlag: "fun" })

          subject.mount(mountNode)

          expectProgramCreatedWithFlags(elmWorker, { myFlag: "flag", anotherFlag: "fun" })
        })
      })

      describe("when there is a config callback", function () {
        it("allows the program to be configured", function () {
          var fakeConfig = jasmine.createSpy("fakeConfig")
          subject.useProgram(elmWorker, {}, fakeConfig)

          subject.mount(mountNode)

          expect(fakeConfig).toHaveBeenCalledWith(fakeWorker)
        })
      })
    })

    describe("when a matching request is received", function() {
      describe("when the next command is called", function() {
        it("passes the updated flags from the worker to the program at the route", function() {
          var flags = { myFlag: "flag" }

          subject.useFlags(flags)
          subject.useProgram(elmWorker)
          subject.route("/current-route").program(elmProgram)
          subject.mount(mountNode)

          var workerGeneratedFlags = { workerFlag: "some new fun flag" }
          fakeWorker.nextFunction(workerGeneratedFlags)

          expect(fakeProgram.requestFlags).toEqual(workerGeneratedFlags)
        })

        describe("when there are route params", function() {
          it("passes the updated flags from the worker plus the route params", function() {
            var flags = { myFlag: "flag" }

            subject.useFlags(flags)
            subject.useProgram(elmWorker)
            subject.route("/current-route/:fun/things/:awesome").program(elmProgram)

            fakeHistory.push("/current-route/bowling/things/37")

            subject.mount(mountNode)

            var workerGeneratedFlags = { workerFlag: "some new fun flag" }
            fakeWorker.nextFunction(workerGeneratedFlags)

            expect(fakeProgram.requestFlags).toEqual({
              workerFlag: "some new fun flag",
              fun: "bowling",
              awesome: "37"
            })
          })
        })
      })
    })
  })

  describe("when the history changes", function() {
    it("embeds the program associated with the route into the mount node", function() {
      subject.route("/another-route").program(elmProgram)
      subject.route("/current-route").program(anotherElmProgram)
      subject.mount(mountNode)

      expect(mountNode.childToAppend.attributes.id).toBe("/current-route")

      fakeHistory.push("/another-route")

      expect(mountNode.childToAppend.attributes.id).toBe("/another-route")
    })
  })
})
