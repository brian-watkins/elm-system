var History = require("history")
var System = require("../src/system")

describe("System", function () {
  var subject
  var fakeHistory
  var mountNode = {}

  beforeEach(function() {
    fakeHistory = History.createMemoryHistory({
      initialEntries: [ '/current-route' ],
      initialIndex: 0
    })
    subject = new System(fakeHistory);
  })

  describe("#mount", function() {
    it("stores the mount node", function () {
      subject.mount(mountNode)

      expect(subject.mountNode).toBe(mountNode)
    })

    it("embeds the program at the current route into the mount node", function () {
        var elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
        var wrongElmProgram = { embed: function() {} }

        subject.route("/another-route").program(wrongElmProgram)
        subject.route("/current-route").program(elmProgram)
        subject.mount(mountNode)

        expect(elmProgram.embed).toHaveBeenCalled()
    })

    describe("when the program has a port for changeLocation", function() {
      it("changes the history when the port command is received", function() {
        var elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
        var assignedPortFunction = null
        var embeddedProgram = {
          ports: {
            changeLocation: {
              subscribe: function (portFunction) {
                assignedPortFunction = portFunction
              }
            }
          }
        }
        elmProgram.embed.and.returnValue(embeddedProgram)

        subject.route("/current-route").program(elmProgram)
        subject.mount(mountNode)

        assignedPortFunction("/some-new-location")

        expect(fakeHistory.location.pathname).toEqual("/some-new-location")
      })
    })
  })

  describe("#useFlags", function() {
    it("passes the flags to all programs", function () {
      var elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])

      var flags = { myFlag: "flag" }

      subject.useFlags(flags)
      subject.route("/current-route").program(elmProgram)
      subject.mount(mountNode)

      expect(elmProgram.embed).toHaveBeenCalledWith(mountNode, flags)
    })
  })

  describe("when the history changes", function() {
    it("embeds the program associated with the route into the mount node", function() {
      var elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
      var wrongElmProgram = { embed: function() {} }

      subject.route("/another-route").program(elmProgram)
      subject.route("/current-route").program(wrongElmProgram)
      subject.mount(mountNode)

      fakeHistory.push("/another-route")

      expect(elmProgram.embed).toHaveBeenCalled()
    })
  })

  describe("when the route has parameters", function() {
    it("adds the parameters as flags to the program", function() {
      var elmProgram = jasmine.createSpyObj("elmProgram", [ "embed" ])
      subject.route("/path/:pathFlag/something").program(elmProgram)
      subject.mount(mountNode)

      fakeHistory.push("/path/37/something")

      expect(elmProgram.embed).toHaveBeenCalledWith({}, { pathFlag: '37' })
    })
  })
})
