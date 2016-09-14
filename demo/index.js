'use strict'

const webpack = require('webpack')
const path = require('path')

function demo() {
  console.info('Demo started')

  webpack({
    entry: path.resolve(__dirname, 'demo'),
    output: {
      path: path.resolve(__dirname, 'output'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.gsheets$/,
          loaders: ['../index']
        }
      ]
    }
  }, function (error, stats) {
    if (error) throw error

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')

    console.info('✅  Done. Check /output/bundle.js')
  })
}

demo()