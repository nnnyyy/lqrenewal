/**
 * Created by nnnyy on 2018-08-20.
 */


exports.login = function( req,res, next) {
    console.log('login!');
    req.session.username = 'nnnyyy';
    req.session.usernick = '왕야옹';
    req.session.auth = 50;
    res.json(0);
}