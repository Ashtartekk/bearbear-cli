'use strict';

const axios = require('axios')
// const urljoin = require('url-join')
const semver = require('semver')

function getNpmInfo(npmName, registry) {
  if (!npmName) {
    return null
  }
  const registryUrl = registry || getDefaultRegistry()
  const npmInfoUrl = `${registryUrl}/${npmName}`
  return axios.get(npmInfoUrl).then(res => {
    if (res.status === 200) {
      return res.data
    } else {
      return null
    }
  }).catch(err => {
    return Promose.reject(err)
  })
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org'
}

async function getNpmVersion(npmName, registry) {
  const data = await getNpmInfo(npmName, registry)
  if (data) {
    return Object.keys(data.versions)
  } else {
    return []
  }
}

function getSemverVersions(baseVersion, versions) {
  return versions = versions
  .filter(version => semver.satisfies(version, `^${baseVersion}`))
  .sort((a,b) => semver.gt(b,a))
}

async function getNpmSemverVersion(baseVersion,npmName, registry) {
  const versions = await getNpmVersion(npmName, registry)
  const newVersions = getSemverVersions(baseVersion, versions)
  if(newVersions && newVersions.length > 0){
    return newVersions[0];
  }
  return null
}

module.exports = {
  getNpmInfo, getNpmVersion, getNpmSemverVersion
}