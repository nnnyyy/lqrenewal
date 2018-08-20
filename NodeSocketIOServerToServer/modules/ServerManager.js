/**
 * Created by nnnyyy on 2018-08-20.
 */
'use strict'
const HashMap = require('hashmap');
const DistServer = require('./DistServer');

class ServerManager {
    constructor(io) {
        const servman = this;

        this.io = io;
        //  자식 서버들 HashMap 초기화
        this.chServMap = new HashMap();

        //  각 자식 서버의 모든 유저 목록
        this.users = new HashMap();

        io.on('connection', function(socket) {
            //  자식 서버 추가
            servman.addServer(socket);
        });

        setInterval(function() {
            servman.io.sockets.emit('conn-count', {cnt: servman.users.count()});
        }, 400);
    }

    addServer( socket ) {
        const servman = this;

        //  서버 정보를 받고나면 확실히 서버 등록을 한다.
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