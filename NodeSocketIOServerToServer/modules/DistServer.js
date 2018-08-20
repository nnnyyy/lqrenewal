/**
 * Created by nnnyyy on 2018-08-20.
 */
'use strict'
const Client = require('./Client');
const HashMap = require('hashmap');

class DistServer {
    constructor(servman, socket, name, port) {
        this.servman = servman;
        this.socket = socket;
        this.name = name;
        this.port = port;
        this.users = new HashMap();

        const distServ = this;

        socket.on('conn-user', function(packet) {
            distServ.addUser( packet.sockid, packet.isLogined );
        })

        socket.on('disconn-user', function(packet) {
            distServ.removeUser( packet.sockid );
        })
    }

    addUser( sockid, isLogined ) {
        let client = new Client();
        this.users.set(sockid, client);
        this.servman.addUser(sockid, client);
        console.log(`conn-user : sockid - ${sockid}`);
    }

    removeUser( sockid ) {
        this.users.delete(sockid);
        this.servman.removeUser(sockid);
        console.log(`disconn-user : cnt: ${this.users.count()} sockid - ${sockid}`);
    }
}


module.exports = DistServer;
