'use strict';

module.exports = { core, checkUserHome, checkInputArgs, checkEnv, checkGlobalUpdate };
const path = require('path')
const semver = require('semver')
const pkg = require('../package.json')
const constant = require('./const')
const log = require("../../log")
const userHome = require('user-home')
const pathExists = require('path-exists').sync

let args, config;
checkInputArgs()
function checkEnv() {
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userHome, '.env')
  if (pathExists(dotenvPath)) {
    config = dotenv.config({
      path: dotenvPath
    })
    cureateDefaultConfig()
    log(`环境变量${config.parsed.CLI_HOME}`)
    log(`DB账号${config.parsed.DB_USER}`)
    log(`DB密码${config.parsed.DB_PWD}`)
  }
}

async function checkGlobalUpdate() {
  // 1.获取当前版本号和模块名
  const currentVersion = pkg.version
  const npmName = pkg.name
  // 2.调用npm API 获取所有版本号
  const { getNpmSemverVersion } = require('../../utils/lib')
  const latestVersion = await getNpmSemverVersion(currentVersion, npmName)
  // 3.提取所有版本号，比对哪些版本号是大于当前版本号的
  if (latestVersion && semver.gt(latestVersion, currentVersion)) {
    // 4.获取最新的版本号，提示用户更新到该版本
    log(`更新提示：请手动更新${npmName} | 当前版本：${currentVersion} | 最新版本：${latestVersion} | `, 'WARN')
    log(`更新命令：npm install -g ${npmName}`, 'WARN')
  }
}

function cureateDefaultConfig() {
  const cliConfig = {
    home: userHome,
  }
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
  }
}


function checkArgs() {
  if (args.debug) {
    process.env.LOG_LEVEL = 'DEBUG';
  } else {
    process.env.LOG_LEVEL = 'INFO'
  }
  log.level = process.env.LOG_LEVEL
}

function checkInputArgs() {
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  checkArgs()
}

function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
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