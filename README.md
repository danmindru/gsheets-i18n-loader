# gsheets-i18n-loader
Webpack loader that grabs Google spreadsheets data as JSON (simple CMS for i18n string management)

### Demo
`node demo`
Check output in `demo/output/bundle.js`

### Testing
`npm run test`
`npm run test:watch`

### Usage
1. Create a Google Spreadsheet like [this one](https://docs.google.com/spreadsheets/d/151DOW0-9Dt_24FNe3536SSotvNAKyQI6bOsznIyd-V0/edit?usp=sharing) `*`

2. Require a file `some-file.gsheets` (plain text) that contains your google sheet id `**` (see [demo](demo)).

-------------------------

> `*` The spreadsheet should have the following format: 

| key	|en|	de |	jp | 
|-|-|-|-|
| TEST	|Testosterone	|Testosteron	|テストステロン|
|QUOTE	| Q'uo"t	|Q'uo"t"	|Q'u'o"t|

> `**` Don't know how to get the id? Check [this](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id) out.

