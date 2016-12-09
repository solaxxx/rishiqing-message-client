/**
 * Created by solax on 2016-12-5.
 * var Client = require('./client.js');
 * var client  = new Client('http://localhost:1717');
 * client.init({
 *  onConnection:function () {},
 *  onActive : function (data) {},
 *  reconnection : function () {}
 * });
 */
// get client
var Client =  require('./client.js');
// export window function
window.RsqMessgeClient = Client;
// export
module.exports = Client;


