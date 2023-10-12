'use strict';

module.exports = core;

const pkg = require('../package.json')
const constant = require('./const')

function core() {
  return {
    cliVersion:CheckPackageVersion(),
    nodeVersion:checkNodeVersion()}
}

function CheckPackageVersion(){
  return pkg.version
}

function checkNodeVersion(){
  //第一步 获取当前Node版本号
  const currentVersion = process.version
  return currentVersion
}