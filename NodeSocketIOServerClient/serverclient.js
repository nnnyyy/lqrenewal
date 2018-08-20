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
var session = require('express-session');

var port = normalizePort(process.env.PORT || '4000');
var before = '';
process.argv.forEach(function(val, idx, arr) {
    console.log(idx + ': ' + val);
    if( before == '-p') {
        port = val;
    }

    if( before =='-name') {
        config.serv_name = val;
    }

    if( before =='-mode') {
        config.mode = val;
    }

    before = val;
})


// Add a connect listener
socketToCenterServer.on('connect', function () {
    this.emit('serv-info', {name: 'ch01', port: port});
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
    //  유저 접속
    console.log('user connected');
    socketToCenterServer.emit('conn-user', {sockid: socket.id});
    socketToCenterServer.on('conn-count', function(packet) {
        io.sockets.emit('conn-count', packet);
    })

    socket.on('disconnect', function() {
        socketToCenterServer.emit('disconn-user', {sockid: this.id});
    })

})

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


