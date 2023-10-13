'use strict';

module.exports = {core,checkUserHome,checkInputArgs,checkEnv};
const path = require('path')
const semver = require('semver')
const pkg = require('../package.json')
const constant = require('./const')
const log = require("../../log")
const userHome = require('user-home')
const pathExists = require('path-exists').sync
let args,config;
checkInputArgs()
function checkEnv(){
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userHome,'.env')
  if(pathExists(dotenvPath)){
    config = dotenv.config({
      path:dotenvPath
    })
    log(`${process.env.LOG_LEVEL}`, `环境变量${config.parsed.CLI_HOME}`)
    log(`${process.env.LOG_LEVEL}`, `DB账号${config.parsed.DB_USER}`)
    log(`${process.env.LOG_LEVEL}`, `DB密码${config.parsed.DB_PWD}`)
  }
}


function checkArgs(){
  if(args.debug){
    process.env.LOG_LEVEL = 'DEBUG';
  }else{
    process.env.LOG_LEVEL = 'INFO'
  }
  log.level = process.env.LOG_LEVEL
}

function checkInputArgs(){
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  checkArgs()
}

function checkUserHome(){
  if(!userHome || !pathExists(userHome)){
    log('ERROR', `当前登录用户主目录不存在`)
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

function core() {
  if (checkNodeVersion()) {
    return {
      cliVersion: CheckPackageVersion(),
      nodeVersion: currentNodeVersion()
    }
  }
}