/**
 * Created by nnnyyy on 2018-08-20.
 */
'use strict'
const HashMap = require('hashmap');
const DistServer = require('./DistServer');

class ServerManager {
    constructor(io) {
        this.chServMap = new HashMap();

        const servman = this;
        io.on('connection', function(socket) {
            //  자식 서버 추가
            servman.addServer(socket);
        });
    }

    addServer( socket ) {
        const servman = this;
        socket.on('serv-info', function(packet) {
            console.log(`child server connected -  name : ${packet.name}, port ${packet.port}`);
            servman.chServMap.set(this.id, new DistServer(this, packet.name, packet.port) );
        })

        socket.on('disconnect', function() {
            servman.removeServer(this);
        })
    }

    getServer( socket ) {
        this.chServMap.get(socket.id);
    }

    removeServer( socket ) {
        let distServer = this.chServMap.get( socket.id );
        console.log(`child server disconnected - ${distServer.name} : ${distServer.port}`);
        this.chServMap.delete(socket.id);
    }
}

module.exports = ServerManager;