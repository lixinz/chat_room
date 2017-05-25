import io from 'socket.io-client'

var chatObj = {
  onlineCount: 0,
  msgArr: [],
  cutMsg: [],
  selfinfo: {},
  userObj: {},
  socket: null,
  init: function (port, userName, color) {
    console.log('init')
    this.socket = io.connect(`localhost:${port || 3000}`)
    this.selfinfo = {'userName': userName, 'color': color}
    console.log(this.selfinfo, 'this.selfinfo')
    this.socket.emit('count', this.selfinfo)
    this.socket.on('count', (onlineCount, userMsg, allUser) => {
      // console.log('count', onlineCount, userMsg)
      // console.log('check', this.msgArr)
      console.log('count_test')
      this.onlineCount = onlineCount
      this.msgArr = userMsg
      this.userObj = allUser
      var temp = this.msgArr.concat()
      this.cutMsg = this.updateMsg(temp, 50, 0)
    })
    this.socket.on('loginout', (onlineCount, userMsg, allUser) => {
      console.log('刷新尝试')
      console.log('#######')
      console.log('loginout_test')
      this.msgArr = userMsg
      this.onlineCount = onlineCount
      this.userObj = allUser
      var temp = this.msgArr.concat()
      this.cutMsg = this.updateMsg(temp, this.cutMsg.length, 0)
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
      var temp = this.msgArr.concat()
      this.cutMsg = this.updateMsg(temp, 50, 0)
    })
    this.socket.on('sendMsg', (msg) => {
      // console.log('sendMsg', msg)
      this.msgArr = msg
      var temp = this.msgArr.concat()
      // console.log('this.cutMsg.length', this.cutMsg.length, temp.length)
      this.cutMsg = this.updateMsg(temp, this.cutMsg.length, 0)
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
    document.getElementById('msgbox').scrollTop = document.getElementById('msgbox').scrollHeight
  },
  goback: function () {
    this.socket.emit('goback')
  },
  updateMsg: function (oldArr, length, Situation) {
    if (length < 50) {
      length = 50
    }
    if (oldArr.length <= length) {
      return oldArr.concat()
    } else if (Situation === 0) {
      return oldArr.splice(-length)
    } else if (Situation === 1) {
      // if (15 + length <= length) {
      return oldArr.splice(-(15 + length))
      // } else {
      //   return oldArr.concat()
      // }
    } else {
      return undefined
    }
  }
}
export default chatObj
