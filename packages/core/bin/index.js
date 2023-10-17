#!/usr/bin/env node

//require: .js/.json/.node 还支持其他所有的文件 会默认用.js的引擎进行解析
const { checkUserHome, checkGlobalUpdate, checkEnv } = require('../lib')
const commander = require('commander')
const core = require('../lib').core

const pkg = require('../package.json')

// const log = require("@bearbear-cli/log")
const log = require('../../log')

const { Command } = require('commander');
const program = new Command();

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug','是否开启调试模式',false)

program.command('clone')
  .description('do clone')
  .action(() => {
    console.log('do clone');
  });


  program.parse();

// log('欢迎使用Bear cli')

// if (core() != undefined) {
//     log(`cli版本为v${core().cliVersion}`)
//     log(`node版本为${core().nodeVersion}`)
//     checkUserHome()
//     checkEnv()
//     checkGlobalUpdate()
// }

