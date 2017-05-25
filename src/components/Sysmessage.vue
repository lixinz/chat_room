<template>
  <div class="Sysmessage">
    <span class="sys-span">
      <slot name="header"></slot>
      <span class="userName">{{sysMsg == (undefined || '')? '' : sysMsg}}</span>
      <slot name="footer"></slot>
    </span>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  props: {
    sysMsg: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sys-span{
  border-radius: 11px;
  border: 1px solid rgba(170, 170, 170, 0.29);
  padding: 1px 8px;
  background: rgba(170, 170, 170, 0.29);
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  justify-content: center;
}
.Sysmessage{
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
}
.userName{
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 5px;
}

</style>
