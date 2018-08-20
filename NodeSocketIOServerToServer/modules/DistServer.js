/**
 * Created by nnnyyy on 2018-08-20.
 */
'use strict'

class DistServer {
    constructor(socket, name, port) {
        this.socket = socket;
        this.name = name;
        this.port = port;

        socket.on('conn-user', function(packet) {
            console.log(`conn-user : sockid - ${packet.sockid}`);
        })

        socket.on('disconn-user', function(packet) {
            console.log(`disconn-user : sockid - ${packet.sockid}`);
        })
    }
}


module.exports = DistServer;
