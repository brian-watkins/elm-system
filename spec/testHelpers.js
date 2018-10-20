var FakeWorkerProgram = require("./fakes/fakeWorkerProgram")
var FakeProgram = require("./fakes/fakeProgram")

const expectProgramCreatedWithFlags = (fakeCode, expectedFlags) => {
  expect(fakeCode.init).toHaveBeenCalled()
  expect(fakeCode.init.calls.mostRecent().args[0].flags).toEqual(expectedFlags)
}

const expectProgramMountedAtNode = (fakeCode, expectedNode) => {
  expect(fakeCode.init).toHaveBeenCalled()
  expect(fakeCode.init.calls.mostRecent().args[0].node).toEqual(expectedNode)
}

const expectProgramMountedAtNodeWithId = (fakeCode, expectedRoute) => {
  expect(fakeCode.init).toHaveBeenCalled()
  expect(fakeCode.init.calls.mostRecent().args[0].node.attributes.id).toBe(expectedRoute)
}

const fakeWorkerFrom = (fakeCode) => {
  var fakeWorker = new FakeWorkerProgram()
  fakeCode.init.and.returnValue(fakeWorker)
  return fakeWorker
}

const fakeProgramFrom = (fakeCode) => {
  var fakeProgram = new FakeProgram()
  fakeCode.init.and.returnValue(fakeProgram)
  return fakeProgram
}

const createCodeSpy = () => {
  return jasmine.createSpyObj('fakeElmCode', [ 'init' ])
}

module.exports = {
  expectProgramCreatedWithFlags,
  expectProgramMountedAtNode,
  expectProgramMountedAtNodeWithId,
  fakeWorkerFrom,
  fakeProgramFrom,
  createCodeSpy
}