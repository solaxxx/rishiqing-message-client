/**
 * Created by solax on 2016-12-7.
 */
var messagePipeline = {
  ACTIVE : 'active' // 默认为active
};

var connect = {
  RECONNECT : 'reconnect'
};

var room = {
  join  : 'join room',
  leave : 'leave room'
};

var constants = {
  MESSAGE_PIPELINE : messagePipeline, // 消息管道类型
  CONNECT : connect,
  ROOM : room
};

module.exports = constants;