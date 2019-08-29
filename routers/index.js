'use strict'
var express = require('express');
var router = express.Router();

const path = require('path')
const url =  require('url')
const fs= require('fs')

// 路由配置取其地址
const { root, routerUrl } = require('../config.js')
const routerPath = path.join(root, routerUrl)

// 正则来匹配所有后缀为 .js的文件
let reg = /([\S]+)\.js$/i;
// 读取锁routers 中的所有文件
function fileDisplay(filePath) {
    // 读取文件夹
    fs.readdir(filePath, (err, files) => {
        if(err) {
            throw new Error(err)
        }
        // 判断里面是文件还是文件夹
        files.forEach(fileName => {
            var fileDir = path.join(filePath,fileName)
            if(fileDir === path.join(__dirname, 'index.js')) {
                return 
            }
            fs.stat(fileDir, (err,stats) => {
                if(err) {
                    throw new Error(err)
                }
                var file = stats.isFile()
                var dir = stats.isDirectory()
                if(file) {
                    let mate = fileName.match(reg);
                    // let matchs = reg.exec(fileName);
                    router.use(`/${mate[1]}`, require(path.join(filePath, mate[1])))
                }
                // 如果是文件夹进行递归调用
                if(dir) {
                    fileDisplay(fileDir) // 递归遍历
                }
            })
        })
    })
}

fileDisplay(routerPath)
module.exports =  router
