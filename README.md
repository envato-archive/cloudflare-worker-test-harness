# Cloudflare Worker Test Harness

This project is an attempt to emulate the Cloudflare Worker runtime
without needing to rely on the console UI. Using this project allows you
to build worker scripts and run a test suite that is as close as
possible what you'll have access to within Cloudflare. For example, `cf`
available on `Request` for controlling Cloudflare features.

Note: While _closer_, this isn't yet as close as it can be. Despite not
relying on node specific APIs, it does use `require` due to keep the
code separate. There are plans to remove this and prevent node specific
APIs but for now it's a caveat. Once that is complete, we will also be
moving to running the tests on v8.

### Usage

- Add it to your `package.json` file.

  ```js
  {
    // ...

    "devDependencies": {
      "cloudflare-worker-test-harness": "git://github.com/envato/cloudflare-worker-test-harness.git#master"
    }

    // ...
  }
  ```

- Run `yarn install`
- Include it in your test

  ```js
  require('cloudflare-worker-test-harness')
  ```

- Write a test that excercises the `fetch` call. You're free to use
  whatever test/mocking framework that you choose; here we are using
  [`jest-fetch-mock`][jest_mock_url].

  ```js
  global.fetch = require('jest-fetch-mock')
  const handleRequest = require('./worker')

  test('cacheTtl is defined', async () => {
    fetch.mockResponse(JSON.stringify({status: 200}))
    const request = new Request('http://example.com/', {
      cf: { cacheTtl: 30 }
    })
    expect(request.cf.cacheTtl).toBe(30)
  })
  ```

### What is included?

This repository aims to match the [Cloudflare Worker API
reference][worker_api_reference]. Any variation of this should be
considered a bug.

- [x] [Fetch API][fetch_api_docs] with [`cf` object][cf_feature_docs] for controlling features
- [x] [ECMAScript Builtins][emcascript_api_docs]
- [ ] [Web Global APIs][web_global_api_docs]
- [ ] [Encoding API][encoding_api_docs]
- [x] [URL API][url_api_docs]
- [ ] [Streams API][streams_api_docs]
- [ ] [Web Crypto API][web_crypto_api_docs]

### Running tests

```
npm test
```

[jest_mock_url]: https://www.npmjs.com/package/jest-fetch-mock
[worker_api_reference]: https://developers.cloudflare.com/workers/reference/
[fetch_api_docs]: https://developer.mozilla.org/docs/Web/API/Fetch_API
[cf_feature_docs]: https://developers.cloudflare.com/workers/reference/cloudflare-features/
[emcascript_api_docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
[web_global_api_docs]: https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope
[encoding_api_docs]: https://developer.mozilla.org/docs/Web/API/Encoding_API
[url_api_docs]: https://developer.mozilla.org/docs/Web/API/URL
[streams_api_docs]: https://developer.mozilla.org/docs/Web/API/Streams_API
[web_crypto_api_docs]: https://developer.mozilla.org/docs/Web/API/Web_Crypto_API
