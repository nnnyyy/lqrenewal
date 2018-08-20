/**
 * Created by nnnyyy on 2018-08-20.
 */
'use strict'
const HashMap = require('hashmap');
const DistServer = require('./DistServer');

const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1');

class ServerManager {
    constructor(io) {
        const servman = this;

        this.io = io;
        // Child Server Map
        this.chServMap = new HashMap();

        // All Users Map
        this.users = new HashMap();

        io.on('connection', function(socket) {
            // Child Server Connected
            servman.addServer(socket);
        });

        setInterval(function() {
            servman.io.sockets.emit('conn-count', {cnt: servman.users.count()});
        }, 400);
    }

    addServer( socket ) {
        const servman = this;
        console.log(`child server connected -  `);
        servman.chServMap.set(this.id, new DistServer(servman, socket) );

        socket.on('serv-info', function(packet) {
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
        console.log(`child server disconnected - `);
        this.chServMap.delete(socket.id);
    }

    addUser(sockid, client) {
        this.users.set(sockid, client);
    }

    removeUser(sockid) {
        this.users.delete(sockid);
    }
}

module.exports = ServerManager;