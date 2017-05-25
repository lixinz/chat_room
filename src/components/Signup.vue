<template>
  <div class="hello">
    <group label-width="4em" label-margin-right="2em" label-align="right" class="group_mt">
      <x-input title="昵称" v-model="name" required show-clear class="input_color"></x-input>
    </group>
    <x-button type="primary" action-type="button"  @click.native="gojump()" class="enjoy">加入聊天室</x-button>
    <alert v-model="show"   button-text="知道了" :title="warn">
      <p class="alert_style">{{alert_tip}}</p>
    </alert>
  </div>
</template>

<script>
import { Group, XInput, XButton, Alert } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Alert
  },
  name: 'hello',
  data () {
    return {
      name: '',
      show: false,
      alert_tip: '',
      warn: 'warning'
    }
  },
  methods: {
    gojump: function () {
      if (this.name === '') {
        this.show = true
        this.alert_tip = '请输入昵称'
      } else {
        this.$http.post('/check', {
          'username': this.name
        }).then((resp) => {
          if (resp.data.res === true) {
            this.show = true
            this.alert_tip = '昵称已被使用'
          } else {
            this.setCookie('user', this.name, 30)
            this.setCookie('color', this.getRandomColor(), 30)
            this.$router.push({name: 'online'})
          }
        })
      }
    },
    setCookie: function (name, value, expires) {
      let exdate = new Date()
      exdate.setDate(exdate.getDate() + expires)
      document.cookie = `${name}=${escape(value)};expires=${new Date(exdate)}`
    },
    getRandomColor: function () {
      return '#' + this.setColor('')
    },
    setColor: function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length === 6) ? color : this.setColor(color)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello{
  /*margin-top: 60px;*/
  position: relative;
  top: 50%;
  transform: translateY(-71%);
}
.input_color{
  color: #dda5ae;
}
.group_mt{
  margin-bottom: 20px;
}
.group_mt .weui-cells{
  width: 80%;
  margin-right: auto;
  margin-bottom: auto;
  margin-left: auto;
  background: linear-gradient(to right, rgba(243, 237, 231, 0.45098), rgb(255, 255, 255), rgba(243, 237, 231, 0.901961));
}
.weui-btn{
  width: 50%;
}
.alert_style{
  text-align:center;
  color: #000;
  font-size: 16px;
}
body{
  margin:0;
  /*background-repeat: no-repeat;
  background-size: contain;
  background-color: #f3ede7;*/
  background: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f3ede7;
  /*overflow: hidden;*/
}
.enjoy{
  background-color: #dda5ae !important;
  width: 50% !important;
}
.weui-label{
  color: #dda5ae;
}
</style>
