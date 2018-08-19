/**
 * Created by nnnyy on 2018-08-20.
 */
const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http);

io.on('connection', function(socket) {
    console.log('connect!');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});