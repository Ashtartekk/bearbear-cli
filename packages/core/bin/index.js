#!/usr/bin/env node

const importLocal = require('import-local')
const lib = require('../lib/core.js')

if(importLocal(__filename)){
    require('npmlog').info('bear','正在使用 bear cli 本地版本')
}else{
    lib(process.argv.slice(2))
}




// const core = require('../lib/core')
// const utils = require('../../utils')
// const utils1 = utils()
// console.log("utils=>>",utils1)
// core()