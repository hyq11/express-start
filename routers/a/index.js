var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    var { name } = req.query
    // limit: 10, skip: 10
    // limit显示 10 条数据，skip: 跳过 10 条数据
    res.send({
        code: 200,
        result: 'data'
    })
});

module.exports = router