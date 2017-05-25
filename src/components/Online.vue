<template>
  <div class="signin">
    <x-header @on-click-back="goback()"  :left-options="{showBack: true, backText:'返回', preventGoBack: true}" >饼大哥聊天室({{chat.onlineCount}})
      <div slot="right" class="detail_st" @click="toinfo()">
        <p>详细信息</p>
        <div class="right-arrow"></div>
      </div>
    </x-header>
    <div class="msg-div" id="msgbox">
      <template v-for="msgObj in chat.cutMsg">
        <template v-if="msgObj.login === 1">
          <sysinfo :sysMsg="toUnescape(msgObj.userName)">
            <span slot="header">欢迎</span>
            <span slot="footer">加入聊天室</span>
          </sysinfo>
        </template>
        <template v-else-if="msgObj.login === -1">
          <sysinfo :sysMsg="toUnescape(msgObj.userName)">
            <span slot="header">恭送</span>
            <span slot="footer">离开聊天室</span>
          </sysinfo>
        </template>
        <template v-else-if="msgObj.login === 2">
          <sysinfo :sysMsg="''">
            <span slot="header">已经连接上服务器</span>
            <span slot="footer"></span>
          </sysinfo>
        </template>
        <template v-else-if="msgObj.login === -2">
          <sysinfo :sysMsg="''">
            <span slot="header">断开服务器服务器</span>
            <span slot="footer"></span>
          </sysinfo>
        </template>
        <template v-else>
          <chatmsg :pic="toUnescape(msgObj.color)" :position="judge(msgObj.userName)" :userName="toUnescape(msgObj.userName)" :msg="msgObj.msg"></chatmsg>
        </template>
      </template>
    </div>
    <div class="textarea_style">
      <x-textarea :show-counter="false" :rows="1"  ref="autosize" v-model="message" id="text"></x-textarea>
      <x-button class="button_style" type="primary" action-type="button"  :mini='true' @click.native="submit()">发送</x-button>
    </div>
    <alert v-model="show_alert"   button-text="知道了" :title="warn">
      <p class="alert_style">输入不能为空</p>
    </alert> 
  </div>
</template>

<script>
import { XHeader, XTextarea, XButton, Group, Alert } from 'vux'
import Sysinfo from './Sysmessage'
import Chatmsg from './Chatmessage'
import Autosize from 'autosize'
export default {
  components: {
    XHeader,
    Sysinfo,
    Chatmsg,
    XTextarea,
    XButton,
    Group,
    Alert
  },
  props: ['chat'],
  name: 'test',
  data () {
    var username = this.getcookie('user', document.cookie)
    return {
      msg: 'Welcome to Your Vue.js App',
      username,
      message: '',
      resize: true,
      scroll: 0,
      warn: 'warning',
      show_alert: false
    }
  },
  mounted () {
    // this.chat.init(3000, this.getcookie('user', document.cookie))
    this.chat.resizeScroll()
    var text = document.getElementById('text')
    var msgbox = document.getElementById('msgbox')
    text.addEventListener('focus', () => {
      Autosize(this.$refs.autosize.$refs.textarea)
    }, true)
    msgbox.addEventListener('scroll', () => {
      if (msgbox.scrollTop <= 15) {
        var temp = this.chat.msgArr.concat()
        this.chat.cutMsg = this.chat.updateMsg(temp, this.chat.cutMsg.length, 1)
        this.resize = false
      }
    }, true)
  },
  beforeUpdate () {
    var msgbox = document.getElementById('msgbox')
    this.scroll = msgbox.scrollHeight
  },
  updated () {
    if (this.resize === false) {
      var msgboxHeight = document.getElementById('msgbox').scrollHeight
      document.getElementById('msgbox').scrollTop = msgboxHeight - this.scroll
      this.resize = true
    } else {
      this.chat.resizeScroll()
    }
  },
  methods: {
    getcookie: function (cookieName, cookie) {
      if (!(cookieName && cookie)) {
        return false
      }
      var reg = new RegExp(`${cookieName}=([^;]+)`)
      return reg.exec(cookie)[1] || ''
    },
    toUnescape: function (val) {
      return unescape(val) === undefined ? '' : unescape(val)
    },
    submit: function () {
      if (this.message === '') {
        this.show_alert = true
      } else {
        this.chat.submit(this.message)
        this.message = ''
        Autosize.destroy(this.$refs.autosize.$refs.textarea)
      }
    },
    judge: function (user) {
      return user === this.username ? 'right' : 'left'
    },
    goback: function () {
      this.chat.goback()
      this.$router.replace({name: 'signup'})
    },
    setCookie: function (name, value, expires) {
      let exdate = new Date()
      exdate.setDate(exdate.getDate() + expires)
      document.cookie = `${name}=${escape(value)};expires=${new Date(exdate)}`
    },
    toinfo: function () {
      this.$router.push({name: 'detail'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app{
  margin-top: 0px;
  height: 100%;
}
.textarea_style{
  width: 100%;
  border-top: 1px solid rgba(170, 170, 170, 0.39);
  display: flex;
  /*padding: 5px;*/
  flex-shrink: 0;
  border-top-color: rgb(252, 251, 247);
  background: radial-gradient(rgb(255, 255, 255), rgb(252, 251, 247));
}
.textarea_style .weui-cell{
  flex-grow: 1;
}
.textarea_style textarea{
  background: linear-gradient(to right, rgb(252, 251, 247), rgba(255, 255, 255, 0.66), rgb(252, 251, 247));
}
.msg-div{
  overflow-x: hidden;
  overflow-y: scroll;
  flex-grow: 1;
  /*background: url(../assets/bg2.jpg);
  background-size: 100% 111%;*/
  margin-bottom: 10px;
}
.signin{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  background-color: #fcfbf7;
  background: url(../assets/bg2.jpg);
  background-size: 100% 95%;
}
html{
  height: 100%;
}
body{
  margin:0;
  height: 100%;
}
.button_style{
  padding: 0em 0.7em;
  margin: auto 1em;
  height: 50%;
  background-color: #cbdec3;
}
.vux-header{
  background-color: #9d7660 !important;
}
.detail_st{
  display: flex;
}
.detail_st p{
  margin:0px;
}
.right-arrow{
  position: relative;
  top: 3px;
  width: 30px;
  left: -15px;
}
.right-arrow:after{
  content:'';
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  transform: rotate(135deg);
  position: absolute;
  border-width: 1px 0 0 1px;
}
.vux-header-right{
  right:0px !important;
}
</style>
