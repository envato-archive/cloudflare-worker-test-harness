require('../src/ecmascript_builtins')

test('eval() is not accessible', async () => {
  expect(eval("1 + 1")).toBeUndefined()
})
