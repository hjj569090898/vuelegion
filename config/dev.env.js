'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"127.0.0.1:8080"',
  MIX_PUSHER_APP_KEY:  '"cf8303b8e5d709e4b8c4"',
  MIX_PUSHER_APP_CLUSTER: '"ap1"'
})
