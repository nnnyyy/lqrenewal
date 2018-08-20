/**
 * Created by nnnyy on 2018-08-20.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req,res, next) {
    res.render('index', {});
});

module.exports = router;