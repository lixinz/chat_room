import io from 'socket.io-client'

var chatObj = {
  onlineCount: 0,
  msgArr: [],
  selfinfo: {},
  socket: null,
  init: function (port, userName) {
    this.socket = io.connect(`localhost:${port || 3000}`)
    this.selfinfo = {'userName': userName}
    this.socket.emit('count', this.selfinfo)
    this.socket.on('count', (onlineCount, userMsg) => {
      // console.log('count', onlineCount, userMsg)
      this.onlineCount = onlineCount
      this.msgArr = userMsg
    })
    this.socket.on('loginout', (onlineCount, userMsg) => {
      // console.log('刷新尝试')
      this.msgArr = userMsg
      this.onlineCount = onlineCount
    })
    this.socket.on('disconnect', () => {
      this.onlineCount = 0
      this.msgArr.push({'login': -2})
      // console.log('break', this.msgArr)
    })
    this.socket.on('reconnect', () => {
      // console.log('reconnet', this.msgArr)
      this.socket.emit('reCount', this.selfinfo, this.msgArr)
    })
    this.socket.on('reCount', (onlineCount) => {
      // console.log('reCount', this.onlineCount)
      this.onlineCount = onlineCount
    })
    this.socket.on('reMsg', (msg) => {
      // console.log('reMsg', msg)
      this.msgArr = msg
    })
    this.socket.on('sendMsg', (msg) => {
      // console.log('sendMsg', msg)
      this.msgArr = msg
    })
  },
  submit: function (msg) {
    let newinfo = JSON.parse(JSON.stringify(this.selfinfo))
    newinfo.msg = msg
    // console.log(newinfo)
    // console.log(this.selfinfo)
    this.socket.emit('sendMsg', newinfo)
  },
  resizeScroll: function () {
    var d = document.getElementById('msgbox').scrollHeight
    document.getElementById('msgbox').scrollTop = d
  },
  goback: function () {
    this.socket.emit('goback')
  }
}
export default chatObj
