// Modifies and disables some of the ECMAScript built in methods to
// match the Cloudflare Worker runtime.

// Disable eval()
window.eval = function () {};

// Disable new Function()
window.Function = function () {};

// Disable new WebAssembly
window.WebAssembly = undefined

// Don't progress `Date.now()` during execution.
const now = Date.now()
Date.now = function () {
  return now;
}
