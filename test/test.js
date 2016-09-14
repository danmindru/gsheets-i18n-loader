/*
 * Setup a test sheet at: https://spreadsheets.google.com/feeds/list/151DOW0-9Dt_24FNe3536SSotvNAKyQI6bOsznIyd-V0/od6/public/values?alt=json
 *
 * The test shouldn't have to deal with it, so bit TODO: mock API call.
 */

const assert = require('assert')
const loader = require('../')
const ctx = {
  cacheable: () => {},
  exec: () => {},
  async: () => {
    function mock (err, cb) {
      return Promise.resolve(cb)
    }
    return mock
  }
}
const gsheetsLoader = loader.bind(ctx)

describe('gsheets-loader', () => {
  it('should load a sheet as stringified JSON', (done) => {
    const expJSON = {
      en: {
        TEST: 'Testosterone',
        QUOTE: `Q'uo"t`
      },
      de: {
        TEST: 'Testosteron',
        QUOTE: `Q'uo"t"`
      },
      jp: {
        "TEST": "テストステロン",
        "QUOTE": `Q'u'o"t`
      }
    }
    const exp = `module.exports = ${JSON.stringify(expJSON)};`;
    const res = gsheetsLoader('151DOW0-9Dt_24FNe3536SSotvNAKyQI6bOsznIyd-V0')

    res
      .then((stringifiedSheet) => {
        assert.equal(exp, stringifiedSheet)
        done()
      })
      .catch((error) => done(error) )
  })
})


// should fail with bad URL?
// should be able to get lang for just one key
// ..