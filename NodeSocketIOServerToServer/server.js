/**
 * Created by nnnyy on 2018-08-20.
 */
const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http);

io.on('connection', function(socket) {
    socket.on('serv-info', function(packet) {
        console.log(`child server connected - name : ${packet.name}`);
    })

    socket.on('conn-user', function(packet) {
        console.log(`conn-user : sockid - ${packet.sockid}`);
    })

    socket.on('disconn-user', function(packet) {
        console.log(`disconn-user : sockid - ${packet.sockid}`);
    })
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});