/**
 * Created by solax on 2016-12-5.
 */
var ERROR     = require('./exception');
var CONSTANTS = require('./constants');
var io        = require('socket.io-client/lib/');


var Client =function (url) {
  this.initRoomStore();
  this.setUrl(url);
  this.iosocket = io.connect(url);
  this.iosocket.zjy = true;
  windowEvent(this);
};


// set url
Client.prototype.setUrl = function (url) {
  if (!url) throw ERROR.ERR_1;
  this.url = url;
};

// init room store
Client.prototype.initRoomStore = function () {
  this.roomStore = {};
};

// set options
Client.prototype.setOptions = function (opt) {
  this.opt = opt || {};
  this.opt.onConnection = this.opt.onConnection || function () {};
  this.opt.reconnection = this.opt.reconnection || function () {};
};

// init connect
Client.prototype.init =  function (opt) {
  var self  = this;
  this.setOptions(opt);
  this.onConnection(); //  init connect
  // reconnect
  this.iosocket.on(CONSTANTS.CONNECT.RECONNECT, function () {
   //   console.log('socket reconnect');
    self.reconnection();
  });
  // receive message
  this.iosocket.on(CONSTANTS.MESSAGE_PIPELINE.ACTIVE, function (data) {
    if (typeof self.opt.onActive === 'function') {
      self.opt.onActive(data);
    }
  });
};

// reconnect
Client.prototype.reconnection = function () {
  this.opt.reconnection.call(this);
  // rejoin all the room
  this.joinStoreRoom();
};

// onConnection
Client.prototype.onConnection = function () {
  this.opt.onConnection.call(this);
};

// join Room
Client.prototype.joinRoom = function  (roomId) {
  this.iosocket.emit(CONSTANTS.ROOM.join, roomId);
  this.addRoomStore(roomId, this.iosocket);
};

// leave Room
Client.prototype.leaveRoom = function  (roomId) {
  this.iosocket.emit(CONSTANTS.ROOM.leave, roomId);
  this.removeRoomStore(roomId);
};

// add one record to room store
Client.prototype.addRoomStore = function (roomId, iosocket) {
  this.roomStore[roomId] = iosocket.id;
};
// remove one record to room store
Client.prototype.removeRoomStore = function  (roomId) {
  delete this.roomStore[roomId];
};

// join each room form room store
Client.prototype.joinStoreRoom  = function () {
  if (this.roomStore) {
    for (var key in this.roomStore) {
      this.joinRoom(key);
      key = 0;
    }
  }
};

// leave all the room
Client.prototype.leaveStoreRoom =function () {
  if (this.roomStore) {
    for (var key in this.roomStore) {
      this.leaveRoom(key);
      key = 0;
    }
  }
};

function windowEvent (client) {
  // on window close
  window.onbeforeunload = function () {
    client.leaveStoreRoom();
    // console.log('onbeforeunload')
  };
  window.addEventListener('online',  function () {
    client.reconnection();
    // console.log('online')
  });
  window.addEventListener('offline', function () {
    // console.log('offline');
  });
}

module.exports = Client;