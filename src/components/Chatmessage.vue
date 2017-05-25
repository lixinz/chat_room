<template>
  <div class="Chatmessage" v-bind:class="[position === 'left' ? '' : 'Chatmessage_r']">
    <span :style="{'background-color':pic }" class="try"></span>
    <span class="Msg">
      <span class="uName" v-bind:class="[position === 'left' ? '' : 'uName_r']">{{userName}}</span>
      <span v-bind:class="[position === 'left' ? 'chatMsg_l' : 'chatMsg_r']">{{msg}}</span>
    </span>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  props: {
    position: {
      type: String,
      default: 'left'
    },
    pic: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Chatmessage{
  display: flex;
  margin-top: 10px;
  align-items: flex-start;
}
.Chatmessage_r{
  flex-direction: row-reverse;
}
.Chatmessage_r .try{
  margin-right: 10px;
}
.try{
  width: 38px;
  height: 40px;
  margin-left: 10px;
  flex-shrink: 0;
}
.Msg{
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  position: relative;
  top:-0.5em;
  max-width: 70%;
  align-items: flex-start;
}
.uName{
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.uName_r{
  align-self:flex-end;
}
.chatMsg_l,.chatMsg_r{
  position: relative;
  /*top: -19%;*/
  background-color: #73d671;
  /*padding: 1% 10.5px;*/
  padding: 0.3em 0.5em;
  font-size: 15px;
  /*max-width: 100%;*/
  border-radius: 3px;
  text-align: left;
  flex-basis: auto;
  /*width:300px;*/
  word-break: break-all;
}
.chatMsg_l{
  background-color: #d5d5d5;
}
.chatMsg_r:before, .chatMsg_l:before{
  content: "";
  width: 7px;
  height: 7px;
  color: #73d671;
  display: inline-block;
  border-left: 2px solid #73d671;
  border-bottom: 2px solid #73d671;
  position: absolute;
  /*right: -5px;*/
  transform: rotate(45deg);
  top: 5px;
  background-color: #73d671;
}
.chatMsg_l:before{
  left: -5px;
  background-color:#d5d5d5;
  border-left: 2px solid #d5d5d5;
  border-bottom: 2px solid #d5d5d5;
}
.chatMsg_r:before{
  right: -5px;
}
</style>
