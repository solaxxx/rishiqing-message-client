# rishiqing-message-client
日事清webSocket推送客户端代码


安装
-----
<pre>
npm install rishqiing-message-client
</pre>


使用说明
-----
commonJs引入
<pre>
// node import method
var Client = require('rishiqing-message-client');
</pre>

webpack引入
<pre>
// webpack import method
import Client     from 'rishiqing-message-client';
</pre>

建立连接
<pre>
var client = new Client('http://localhost:1717');
client.init({
    onConnection:function () { ? // 连接成功
        console.log('connection success');
    },
    onActive : function (data) { // 收到消息
        console.log('recevice data : %o', data);
    },
    reconnection : function () { // 断线重连
        console.log('reconnection success');
    }
});
</pre>

加入房间
<pre>
client.joinRoom(roomId);
</pre>


退出房间
<pre>
client.leaveRoom(roomId);
</pre>




在浏览器端直接使用
-----

下载
<pre>
https://github.com/rishiqing/rishiqing-message-client/blob/master/build/bundle.js
</pre>

引入
<pre>
&lt;script type="text/javascript" src="./rishiqing-message-client/build/bundle.js"/&gt;
var client  = new RsqMessgeClient('http://localhost:1717');
</pre>






备注
-----
暂无
