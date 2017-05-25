<template>
  <div class="simpleinfo">
    <template v-for="(val, key) in userObj">
      <div class="info-div">
        <div class="userpic" :style="{'background-color': toUnescape(val.color)}"></div>
        <div class="info-name">{{toUnescape(key)}}</div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  data () {
    console.log(this.userObj)
    return {}
  },
  props: ['userObj'],
  methods: {
    toUnescape: function (val) {
      return unescape(val) === undefined ? '' : unescape(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.userpic{
  width: 55px;
  height: 55px;
  /*background-color: rgb(170, 170, 170);*/
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
}
.info-div{
  margin-top: .7em;
  margin-left: 1em;
}
.simpleinfo{
  display: flex
}
.info-name{
  font-size: 14px;
  word-wrap: break-word;
  white-space: nowrap;
  width: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
