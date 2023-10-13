#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const { checkUserHome, checkInputArgs, checkGlobalUpdate, checkEnv } = require('../lib')

checkInputArgs()
const core = require('../lib').core

// const log = require("@bearbear-cli/log")
const log = require('../../log')

log('欢迎使用Bear cli')

if (core() != undefined) {
    log(`cli版本为v${core().cliVersion}`)
    log(`node版本为${core().nodeVersion}`)
    checkUserHome()
    checkEnv()
    checkGlobalUpdate()
}