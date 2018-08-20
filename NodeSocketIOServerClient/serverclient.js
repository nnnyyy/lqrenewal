/**
 * Created by nnnyy on 2018-08-20.
 */
const ioclient = require('socket.io-client');
var socketToCenterServer = ioclient.connect('http://localhost:3000', {reconnect: true });

const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Add a connect listener
socketToCenterServer.on('connect', function () {
    this.emit('serv-info', {name: 'ch01'});
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

io.on('connection', function( socket ) {
    //  ���� ����
    console.log('user connected');
    socketToCenterServer.emit('conn-user', {sockid: socket.id});
    socket.on('disconnect', function() {
        socketToCenterServer.emit('disconn-user', {sockid: this.id});
    })
})

http.listen(4000, function() {
    console.log('listening on *:4000');
});


