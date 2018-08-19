/**
 * Created by nnnyy on 2018-08-20.
 */
const ioclient = require('socket.io-client');
var socket = ioclient.connect('http://localhost:3000', {reconnect: true });

const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
router.get('/', function(req,res, next) {
   res.render('index', {});
});
app.use('/', router);

http.listen(4000, function() {
    console.log('listening on *:4000');
});