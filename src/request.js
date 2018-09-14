// Updates the `Request` class to include the ability to manage the `cf`
// features for the fetch requests.
//
// See https://developers.cloudflare.com/workers/reference/cloudflare-features/
require('whatwg-fetch')

const OldRequest = global.Request
global.Request = class Request extends OldRequest {
  constructor(input, options) {
    super(input, options)
    this.cf = options && options.cf || {}
  }
}
