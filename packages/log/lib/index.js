'use strict';

module.exports = index;

const log = require('npmlog')

function index(msg) {
  log.info('bear',`${msg}`)
}
