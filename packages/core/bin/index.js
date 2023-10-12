#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const core = require('../lib')
const log = require("@bearbear-cli/log")

log('INFO', '欢迎使用Bear cli')

if (core() != undefined) {
    log('INFO',`cli版本为v${core().cliVersion}`)
    log('INFO',`node版本为${core().nodeVersion}`)
}