'use strict';

module.exports = core;

const semver = require('semver')
const pkg = require('../package.json')
const constant = require('./const')
const log = require("@bearbear-cli/log")

function core() {
  // checkNodeVersion()
  if (checkNodeVersion()) {
    return {
      cliVersion: CheckPackageVersion(),
      nodeVersion: currentNodeVersion()
    }
  } else {
    return
  }
}

function CheckPackageVersion() {
  return pkg.version
}

function currentNodeVersion() {
  const currentVersion = process.version
  return currentVersion
}

function checkNodeVersion() {
  const currentVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VERSION
  if (!semver.gte(currentVersion, lowestVersion)) {
    log('ERROR', `需要安装 v${lowestVersion} 以上版本的 Node.js`)
    return false
  } else {
    return true
  }
}