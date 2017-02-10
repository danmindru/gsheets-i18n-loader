'use strict'

const request = require('request-promise')

/**
 * Google sheets i18n loader module.
 * @module gsheets-i18n-loader
 * @type {function}
 *
 * @param {string} sheetURL - The Google Sheet URL to load.
 */
module.exports = function (sheetURL) {
  const cb = this.async()
  const url = `https://spreadsheets.google.com/feeds/list/${sheetURL.replace(/(\r\n|\n|\r)/gm,'')}/od6/public/values?alt=json`

  return request(url)
    .then((res) => {
      let output = {}
      const jsonOutput = JSON.parse(res)
      const langKeys = parseLangKeys(jsonOutput.feed.entry[0])

      jsonOutput.feed.entry.forEach((entry) => {
        langKeys.forEach((langKey) => {
          const locale = langKey.replace('gsx$', '')
          output[locale] = output[locale] ? output[locale] : {}
          output[locale][entry['gsx$key'].$t] = entry[langKey].$t
        })
      })

      return cb(null, `module.exports = ${JSON.stringify(output)};`)
    })
    .catch((error) => {
      return cb(error)
    })
}


/**
 * Hackish way to get available translation keys from the first row of the sheet.
 * @method parseLangKeys
 *
 * @param {object} firstSheetRow - The first row of the Google Sheet.
 */
function parseLangKeys (firstSheetRow) {
  let output = []
  const keys = Object.keys(firstSheetRow)

  for (let i = 0; i < keys.length; i++){
    if (keys[i].includes('gsx') && !keys[i].includes('key')) output.push(keys[i])
  }

  return output
}
