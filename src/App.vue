<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  body{
    font-size:10px;
    font-size:1rem;
    height: 100%;
  }
  ::-webkit-input-placeholder{
    color: #99A9BF;
  }
  #app {
    background-color: #1D8CE0;
    height: 100%;
    display: flex;
    overflow-y: scroll;
  }
  .text-xs{
    font-size: 1.2rem;
  }
  .text-sm{
    font-size: 1.4rem;
  }
  .text-md{
    font-size: 1.6rem;
  }
  .text-lg{
    font-size: 1.8rem;
  }
  .text-hg{
    font-size: 2rem;
  }
  .text-left{
    text-align: left;
  }
  .text-right{
    text-align: right;
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .text-danger{
    color: #f00;
  }
  .text-primary{
      color: #20a0ff;
  }
</style>
