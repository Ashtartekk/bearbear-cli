'use strict';

module.exports = index;

const dayjs  = require('dayjs')
const log = require('npmlog')

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'INFO'
log.addLevel(`Bear`, 2000, { fg: 'blue', bold: true }); 

function index(msg,level) {
  if(!level){
    log.Bear(`${process.env.LOG_LEVEL} [${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}]`,`${msg}`)
  }else{
    log.Bear(`${level} [${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}]`,`${msg}`)
  }
}
