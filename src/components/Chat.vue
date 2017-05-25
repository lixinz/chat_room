<template>
  <div class="chat">
    <router-view :chat="chat"></router-view>
  </div>
</template>

<script>
import chat from '../api/connect.js'
export default {
  components: {},
  name: 'test',
  data () {
    var username = this.getcookie('user', document.cookie)
    var color = this.getcookie('color', document.cookie)
    return {
      chat,
      username,
      color,
      response: true
    }
  },
  // beforeCreate () {
  //   if (document.cookie.indexOf('user=') === -1) {
  //     console.log('???')
  //     this.$router.replace({name: 'signup'})
  //   }
  // },
  created () {
    console.log('parent')
    if (document.cookie.indexOf('user=') === -1) {
      console.log('???')
      this.$router.replace({name: 'signup'})
    } else {
      console.log(this.username)
      this.$http.post('/check', {
        'username': this.username
      }).then((resp) => {
        if (resp.data.res === true) {
          this.$router.replace({name: 'signup'})
        } else {
          this.response = false
          console.log('!!@@@$$%%')
          this.chat.init(3000, this.username, this.color)
        }
      })
    }
  },
  // mounted () {
  //   this.chat.init(3000, this.username)
  // },
  beforeDestroy () {
    console.log('!!!!!')
    if (this.response === false) {
      console.log('@@@')
      this.chat.goback()
    }
  },
  methods: {
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
.chat{
  height: 100%;
}
</style>
