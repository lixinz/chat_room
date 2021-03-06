let express = require('express');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let userObj = {};
let onlineCount = 0;
let userMessage = [];
let bodyParser = require('body-parser')
app.use(bodyParser());

app.post('/check', function (req, res) {
  let result = {};
  console.log(req.body.username, 'console username cookie', typeof req.body.username)
  if (!userObj[escape(req.body.username)] && req.body.username !== undefined) {
  	console.log('true /check')
    result.res = false;
  } else {
  	console.log('false /check')
    result.res = true;
  }
  res.send(result);
  res.end();
})
app.post('/info', function (req, res) {
  console.log('userObj!!',userObj)
  res.send(userObj);
  res.end();
})

console.log('onlineCount',onlineCount)
//服务器监听所有客户端
io.on('connection', function (socket) {
	// 当有新的用户连接的事件
	// let user_name = getcookie('user',socket.handshake.headers.cookie);
	socket.on('count', (userinfo) => {
		console.log('userinfo', userinfo, userObj);
		console.log('onlineCount', onlineCount)
		if (!userObj[userinfo.userName] && userinfo !== undefined) {
			console.log('true',userObj)
			socket.name = userinfo.userName;
			userObj[userinfo.userName] = userinfo;
			userMessage.push(JSON.parse(JSON.stringify(userinfo)));
			userMessage[userMessage.length - 1].login = 1;
			// socket.msgArr = userMessage.concat();
			// socket.temp = updateMsg(socket.msgArr, 15)
			// console.log('socket.temp', socket.temp)
			console.log('userObj',userObj,onlineCount);
			io.sockets.emit('count', ++onlineCount, userMessage, userObj);
			// io.sockets.emit('count', ++onlineCount, socket.temp, userMessage);
			console.log('++', onlineCount, userMessage, userObj);
		}else{
			socket.emit('count', onlineCount, userMessage);
		}
	})
    socket.on('reCount', (userinfo, msg) => {
    	console.log('userinfo reCount!', userinfo, userObj)
    	if (!userObj[userinfo.userName]) {
    		console.log('true reCount', onlineCount)
    		socket.name = userinfo.userName;
			userObj[userinfo.userName] = userinfo;
			msg.push({login: 2})
			userMessage = msg;
			// socket.msgArr = userMessage.concat();
			// socket.temp = updateMsg(socket.msgArr, 15);
			io.sockets.emit('reCount', ++onlineCount);
			socket.emit('reMsg', msg)
			console.log('reCount ++', onlineCount)
			console.log('msg', msg, userMessage)
		}
	});
	socket.on('sendMsg', (msg) => {
		console.log('sendMsg')
		userMessage.push(JSON.parse(JSON.stringify(msg)));
		// socket.msgArr = userMessage.concat();
		// socket.temp = updateMsg(socket.msgArr, 15);
		io.sockets.emit('sendMsg', userMessage);
	});
	socket.on('disconnect', () => {
		console.log('刷新断线', socket.name)
		// socket.emit('giveUserObj');
		if (userObj[socket.name]) {
			userMessage.push(JSON.parse(JSON.stringify(userObj[socket.name])));
			console.log('userMessage.length', userMessage.length - 1)
			console.log('push before userMessage', userMessage)
			userMessage[userMessage.length - 1].login = -1;
			console.log('userMessage', userMessage)
			console.log('delete前', userObj)
			// socket.msgArr = userMessage.concat();
			// socket.temp = updateMsg(socket.msgArr, 15)
			delete userObj[socket.name];
			console.log('delete后', userObj);
			// io.sockets.emit('loginout', --onlineCount, userMessage)
			// console.log('socket.temp', socket.temp)
			io.sockets.emit('loginout', --onlineCount, userMessage, userObj)
			console.log('断线人数更新', onlineCount, userMessage)
		}
  	});
  	socket.on('goback', () => {
		console.log('goback', socket.name)
		// socket.emit('giveUserObj');
		if (userObj[socket.name]) {
			userMessage.push(JSON.parse(JSON.stringify(userObj[socket.name])));
			console.log('userMessage.length', userMessage.length - 1)
			console.log('push before userMessage', userMessage)
			userMessage[userMessage.length - 1].login = -1;
			console.log('userMessage', userMessage)
			console.log('delete前', userObj)
			// socket.msgArr = userMessage.concat();
			// socket.temp = updateMsg(socket.msgArr, 15)
			delete userObj[socket.name];
			console.log('delete后', userObj);
			io.sockets.emit('loginout', --onlineCount, userMessage, userObj)
			console.log('断线人数更新', onlineCount, userMessage)
		}
  	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

function getcookie (cookie_name, cookie) {
	if (!(cookie_name && cookie)) {
		return false;
	}
	let reg = new RegExp(`${cookie_name}=([^;]+)`);
	return reg.exec(cookie)[1] || '';
}

function updateMsg (oldArr, length) {
	if (oldArr.length <= length) {
		return oldArr.concat();
	} else {
		return oldArr.splice(-15,15);
	}
}