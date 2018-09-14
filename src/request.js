// Updates the `Request` class to include the ability to manage the `cf`
// features for the fetch requests.
//
// See https://developers.cloudflare.com/workers/reference/cloudflare-features/
require('whatwg-fetch')

// Available `cf` features. Any keys that are not here and set in `cf`
// will be discarded.
const cfFeatures = [
  "scrapeShield",
  "polish",
  "minify",
  "mirage",
  "scrapeShield",
  "apps",
  "resolveOverride",
  "cacheKey",
  "cacheTtl",
  "cacheTtlByStatus"
]

const OldRequest = global.Request
global.Request = class Request extends OldRequest {
  constructor(input, options) {
    super(input, options)

    if (options && options.cf) {
      sanitisedOptions = Object.keys(options.cf)
        .filter(key => cfFeatures.includes(key))
        .reduce((newObj, key) => {
          newObj[key] = options.cf[key];
          return newObj;
        }, {});
    }
    this.cf = sanitisedOptions || {}
  }
}
