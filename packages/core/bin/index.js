#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const core = require('../lib')
const log = require('../../log/lib/index')

const version = core()

log('欢迎使用Bear cli')
log(`当前版本为${version}`)
