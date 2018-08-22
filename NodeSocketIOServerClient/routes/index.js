/**
 * Created by nnnyy on 2018-08-20.
 */
const express = require('express');
const router = express.Router();
const Auth = require('./auth');

router.use(function(req,res,next) {
    next();
});

router.get('/', function(req,res, next) {
    res.render('index', { username: req.session.username, nick: req.session.usernick });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', {servname: 'testServer', username: req.session.username, nick: req.session.usernick});
})

router.post('/login', Auth.login);

module.exports = router;