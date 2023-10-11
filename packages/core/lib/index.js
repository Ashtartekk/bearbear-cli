'use strict';

module.exports = core;

const pkg = require('../package.json')

function core() {
  return CheckPackageVersion()
}


function CheckPackageVersion(){
  return pkg.version
}