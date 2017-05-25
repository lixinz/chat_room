<template>
  <div class="userinfo">
    <x-header  :left-options="{showBack: true, backText:'返回', preventGoBack: true}" >用户列表</x-header>
    <group>
      <cell title="聊天室名称" value="饼大哥" class="chat_p"></cell>
    </group>
    <group class="group_flex">
      <simpleinfo></simpleinfo>
      <simpleinfo></simpleinfo>
      <simpleinfo></simpleinfo>
      <simpleinfo></simpleinfo>
      <simpleinfo></simpleinfo>
      <simpleinfo></simpleinfo>
    </group>
    <x-button type="primary" action-type="button"  @click.native="gojump()" class="leave">离开聊天室</x-button>
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
  data () {
    var username = this.getcookie('user', document.cookie)
    return {
      show: false,
      show_alert: false,
      username
    }
  },
  methods: {
    gojump: function () {
      this.show = true
    },
    onConfirm: function () {
      this.$http.post('/delete', {
        'username': this.username
      }).then((resp) => {
        if (resp.data.res === true) {
          this.$router.push({name: 'signup'})
        } else {
          this.$router.push({name: 'signup'})
        }
      })
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
</style>
