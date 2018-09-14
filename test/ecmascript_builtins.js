require('../src/ecmascript_builtins')

test('eval() is not accessible', () => {
  expect(eval("1 + 1")).toBeUndefined()
})

test('new Function() is not accessible', () => {
  var sum = new Function('a', 'b', 'return a + b');
  expect(sum).not.toBe(Function)
})

test('WebAssembly is not accessible', () => {
  expect(WebAssembly).toBeUndefined()
})

test('Date.now does not advance in execution', () => {
  var start = Date.now()

  // Purposely do something that will hold the execution for a small
  // amount of time so that the `Date.now()` calls *should* differ.
  for (i = 0; i < 10000; i++);

  var end = Date.now()
  expect(start).toEqual(end)
})
