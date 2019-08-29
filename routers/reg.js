var express = require('express');
var router = express.Router();
const category = require('../db/models/category')
// category.find({categoryName: '热点'}, (err,data)=> {
//     console.log(data)
//   })
/* GET home page. */
router.get('/', async (req, res, next) => {
    var { name, page = 1, limit=10 } = req.query
    var obj = {}
    if(name) {
        obj = {
            categoryName: name
        }
    }
    const data = await category.find(obj, null, {limit, skip: page-1})
    // limit: 10, skip: 10
    // limit显示 10 条数据，skip: 跳过 10 条数据
    // const data = await category.find({}, null, {limit: 10, skip: 10})
    res.send({
        code: 200,
        result: data
    })
});

module.exports = router