'use strict'

const path = require('path')
const url =  require('url')

const fs= require('fs')

const config = require('../config.js')

function getCtrl(reqUrl){
    var ctrlName = url.parse(reqUrl).pathname
    return require(path.join(config.root, config.routerUrl, ctrlName))
}

module.exports = function (app) {
    var dispatch = function (url) {
        app.use('/api' + url, getCtrl(url))
    }

    dispatch('/reg')
}