#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const core = require('../lib')
const log = require("@bearbear-cli/log")
// const log = require('../../log')

const coredata = core()

console.log("coredata=>>",coredata)

log('INFO','欢迎使用Bear cli')
log('INFO',`cli版本为v${coredata.cliVersion}`)
log('INFO',`node版本为${coredata.nodeVersion}`)
