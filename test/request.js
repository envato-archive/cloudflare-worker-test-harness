require('../src/request')

global.fetch = require('jest-fetch-mock')

test('cf is undefined if not configured', async () => {
  const request = new Request('http://example.com/')
  expect(request.cf).toBeUndefined()
})

test('discards invalid cf properties', async () => {
  const request = new Request('http://example.com/', {
    cf: {
      something: "else",
      nonExistent: true,
      cacheTtl: 300
    }
  })

  expect(request.cf.something).toBeUndefined()
  expect(request.cf.nonExistent).toBeUndefined()
  expect(request.cf).toEqual({
    cacheTtl: 300
  })
})

test('allows all expected valid cf properties', async () => {
  const request = new Request('http://example.com/', {
    cf: {
      scrapeShield: false,
      polish: 'lossless',
      minify: {
        javascript: true,
        css: true,
        html: false
      },
      mirage: false,
      scrapeShield: false,
      apps: false,
      resolveOverride: 'alt-dc.example.com',
      cacheKey: '${protocol}${uri}',
      cacheTtl: 300,
      cacheTtlByStatus: {
        "200-299": 86400,
        404: 1,
        "500-599": 0
      },
      hostMetadata: {
        redirect_to_https: true
      }
    }
  })

  expect(request.cf).toBeDefined()
  expect(request.cf.scrapeShield).toEqual(false)
  expect(request.cf.polish).toEqual('lossless')
  expect(request.cf.minify).toEqual({
    javascript: true,
    css: true,
    html: false
  })
  expect(request.cf.mirage).toEqual(false)
  expect(request.cf.scrapeShield).toEqual(false)
  expect(request.cf.apps).toEqual(false)
  expect(request.cf.resolveOverride).toEqual('alt-dc.example.com')
  expect(request.cf.cacheKey).toEqual('${protocol}${uri}')
  expect(request.cf.cacheTtl).toEqual(300)
  expect(request.cf.cacheTtlByStatus).toEqual({
    "200-299": 86400,
    404: 1,
    "500-599": 0
  })
  expect(request.cf.hostMetadata).toEqual({
    redirect_to_https: true
  })
})
