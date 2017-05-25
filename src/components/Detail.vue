<template>
  <div class="userinfo">
    <x-header @on-click-back="goback()" :left-options="{showBack: true, backText:'返回', preventGoBack: true}" >用户列表</x-header>
    <group>
      <cell title="聊天室名称" value="饼大哥" class="chat_p"></cell>
    </group>
    <group class="group_flex">
      <simpleinfo :userObj="chat.userObj"></simpleinfo>
    </group>
    <group class="button_st">
      <x-button type="warn" action-type="button"  @click.native="gojump()" class="leave">离开聊天室</x-button>
    </group>
    <confirm v-model="show"
      @on-confirm="onConfirm">
        <p style="text-align:center;">确定离开聊天室吗</p>
    </confirm>
  </div>
</template>

<script>
import { Group, XHeader, Cell, XButton, Confirm, Alert } from 'vux'
import Simpleinfo from './Simpleinfo'
export default {
  components: {
    Group,
    XHeader,
    Cell,
    Simpleinfo,
    XButton,
    Confirm,
    Alert
  },
  name: 'userinfo',
  props: ['chat'],
  data () {
    var username = this.getcookie('user', document.cookie)
    return {
      show: false,
      show_alert: false,
      username
    }
  },
  methods: {
    goback: function () {
      this.$router.replace({name: 'online'})
    },
    gojump: function () {
      this.show = true
    },
    onConfirm: function () {
      this.chat.goback()
      this.$router.replace({name: 'signup'})
    },
    getcookie: function (cookieName, cookie) {
      if (!(cookieName && cookie)) {
        return false
      }
      var reg = new RegExp(`${cookieName}=([^;]+)`)
      return reg.exec(cookie)[1] || ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.userinfo{
  height: 100%;
  background: #fbf9fe !important;
}
.chat_p p{
  margin: 0px;
  text-align: left;
}
.group_flex .weui-cells{
  display: flex;
  flex-wrap: wrap;
}
.leave{
  margin-top: 20px;
  width: 90% !important;
}
.button_st{
  padding-top: 20px;
  background: #fbf9fe;
}
.button_st .weui-cells{
    margin-top: 0px;
    padding-bottom: 20px;
}
</style>
