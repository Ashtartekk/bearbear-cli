#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const checkUserHome = require('../lib').checkUserHome
const checkInputArgs = require('../lib').checkInputArgs
checkInputArgs()
const core = require('../lib').core

// const log = require("@bearbear-cli/log")
const log = require('../../log')

log(`${process.env.LOG_LEVEL}`, '欢迎使用Bear cli')

if (core() != undefined) {
    log(`${process.env.LOG_LEVEL}`, `cli版本为v${core().cliVersion}`)
    log(`${process.env.LOG_LEVEL}`, `node版本为${core().nodeVersion}`)
    checkUserHome()
}