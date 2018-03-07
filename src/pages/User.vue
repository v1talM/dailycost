<template>
  <div class="muck-up">
    <div class="overlay"></div>
    <div class="top">
      <div class="nav">
        <span class="ion-android-menu"></span>
        <p>Timeline</p>
        <span class="ion-ios-more-outline"></span>
      </div>
      <div class="user-profile">
        <img src="https://raw.githubusercontent.com/arjunamgain/FilterMenu/master/images/profile.jpg">
        <div class="user-details">
          <h4>{{ user_info.name }}</h4>
          <p>{{ user_info.info }}</p>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="filter-btn">
      <a id="bar" href="#" @click.prevent="filterBtn"><icon name="bar-chart"></icon></a>
      <a id="timeline" href="#" @click.prevent="filterBtn"><icon name="list-alt"></icon></a>
      <a id="pie" href="#" @click.prevent="filterBtn"><icon name="pie-chart"></icon></a>
      <a href="#" id="home" @click.prevent="goHome"><icon name="calendar"></icon></a>
      <span class="toggle-btn el-icon-menu" @click="toggleBtn"></span>
    </div>
    <div class="clearfix"></div>
    <div class="bottom">
      <div class="title">
        <h3>我的账单</h3>
        <small>{{ new Date() }}</small>
      </div>
      <ul class="tasks">
        <li class="timeline" :class="color(item)" v-for="item in all_data">
          <span class="task-title">{{ item.name }}</span>
          <span class="task-time">￥{{ item.cost }}</span>
          <span class="task-cat">{{ item.date }}</span>
        </li>
        <li class="pie">
            <pie></pie>
        </li>
        <li class="bar">
            <bar></bar>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Pie from '@/components/user/pie'
  import Bar from '@/components/user/bar'
  import {user_info} from '@/env'
  export default {
      name: "user",
      components: {
          Pie, Bar
      },
      data () {
        return {
          all_data: [],
          user_info
        }
      },
      created () {
        let store = window.localStorage
        let data = []
        for (let index in store) {
          if (index.search("items-") != "-1") {
            let d = JSON.parse(store[index])
            for (let v in d) {
              let date = index.replace(/items-/, "")
              d[v].date = date
              data.push(d[v])
            }
          }
        }
        this.all_data = data.reverse()
        this.$store.dispatch('setAllData', this.all_data)
      },
      mounted () {
        $('.toggle-btn').click(function() {
          $('.filter-btn').toggleClass('open');

        });

        $('.filter-btn a').click(function() {
          $('.filter-btn').removeClass('open');
        });

        $('#timeline').click(function() {
          $('.tasks li:not(.timeline)').slideUp(300, function() {
            $('.timeline').slideDown(300);

          });
        });

        $('#pie').click(function() {
          $('.tasks li:not(.pie)').slideUp(300, function() {
            $('.pie').slideDown(300);

          });
        });

        $('#bar').click(function() {
          $('.tasks li:not(.bar)').slideUp(300, function() {
            $('.bar').slideDown(300);

          });
        });
      },
      methods: {
        toggleBtn (e) {
          let _this = e.currentTarget
          if (_this.className.search("el-icon-menu") != -1) {
              _this.className = "toggle-btn el-icon-close"
          } else {
            _this.className = "toggle-btn el-icon-menu"
          }

        },
        filterBtn (e) {
          $(".toggle-btn").addClass("el-icon-menu").removeClass("el-icon-close")
        },
        color (d) {
          switch (d.type) {
            case "glass": return "red"; break;
            case "coffee": return "green"; break;
            case "lemon-o": return "blue"; break;
            case "microphone": return "teal"; break;
            case "film": return "pink"; break;
            case "tag": return "violet"; break;
            case "user": return "orange"; break;
            default: return "yellow"
          }
        },
        goHome () {
            this.$router.push('/')
        }
      }
  }
</script>

<style lang="css">
  .muck-up {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .overlay {
    background: url(https://raw.githubusercontent.com/arjunamgain/FilterMenu/master/images/header.jpg) no-repeat top /contain;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .overlay:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(71, 32, 84, 0.5);
  }

  .muck-up > .top {
    position: relative;
    min-height: 240px;
    padding: 15px;
    color: #fff;
  }

  .top .nav span {
    float: left;
    display: block;
  }

  .nav p {
    margin-top: 2px;
    display: inline-block;
    float: left;
    vertical-align: bottom;
  }

  .ion-android-menu {
    font-size: 24px;
    margin-right: 17px;
  }

  .nav .ion-ios-more-outline {
    font-size: 38px;
    float: right !important;
  }

  .user-profile {
    margin-top: 90px;
  }

  .user-profile img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    float: left;
    margin-right: 24px;
  }

  .user-details p {
    font-size: 11px;
  }

  .user-details {
    float: left;
    margin-top: 5px;
    vertical-align: bottom;
  }

  .user-details h4 {
    font-size: 18px;
  }

  .filter-btn {
    position: absolute;
    z-index: 2;
    right: 0;
    width: 40px;
    height: 40px;
    transition: all 0.4s ease-in-out 0s;
  }

  .filter-btn span {
    width: 40px;
    height: 40px;
    background: #FA396B;
    display: block;
    position: absolute;
    right: 25px;
    top: -46px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    border-radius: 50%;
    font-size: 22px;
    z-index: 999;
  }
  .filter-btn a {
    position: absolute;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    right: 25px;
    display: block;
    top: -46px;
    color: #fff;
    z-index: 99;
    font-size: 22px;
    transition: all .4s cubic-bezier(.68, 1, .265, 1)
  }

  .filter-btn:after {
    height: 170px;
    width: 170px;
    content: '';
    background-color: #FA396B;
    position: absolute;
    top: -110px;
    right: -40px;
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s ease-in-out 0s;
  }

  .open:after {
    transform: scale(1);
  }

  .filter-btn.open a:nth-child(1) {
    transform: translate(9px, -62px);
  }

  .filter-btn.open a:nth-child(2) {
    transform: translate(-50px, -34px);
  }

  .filter-btn.open a:nth-child(3) {
    transform: translate(-56px, 25px);
  }

  .filter-btn.open a:nth-child(4) {
    transform: translate(5px, 61px);
  }

  .muck-up .bottom {
    background-color: #fff;
    min-height: 100%;
    z-index: 1;
    padding: 35px;
    position: relative;
    color: #222;
    padding-top: 0px;
  }

  .bottom:after {
    content: '';
    position: absolute;
    top: -4rem;
    background: #fff;
    left: -1rem;
    right: 0;
    height: 100px;
    transform: rotate(10deg);
    width: 120%;
    z-index: -1;
  }

  .bottom .title {
    margin-bottom: 20px;
  }

  .bottom .title h3 {
    font-size: 22px;
    margin-bottom: 5px;
  }

  .title small {
    font-size: 10px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul.tasks .task-title {
    font-size: 13px;
    display: inline-block;
  }

  ul.tasks .task-time {
    float: right;
    font-size: 10px;
    color: #888;
  }

  ul.tasks .task-cat {
    font-size: 10px;
    display: block;
    color: #888;
  }

  ul.tasks li {
    margin-bottom: 16px;
    position: relative;
    z-index: 8;
  }

  ul.tasks li:after {
    content: '';
    position: absolute;
    left: -18px;
    top: 8px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
  }

  ul.tasks li.red:after {
    background: #FF3163;
  }

  ul.tasks li.green:after {
    background: #54D6C7;
  }

  ul.tasks li.yellow:after {
    background: #EAB429;
  }
  ul.tasks li.blue:after {
    background: #2185D0;
  }
  ul.tasks li.teal:after {
    background: #00B5AD;
  }
  ul.tasks li.pink:after {
    background: #FF8EDF;
  }
  ul.tasks li.violet:after {
    background: #A291FB;
  }
  ul.tasks li.orange:after {
    background: #FF851B;
  }
  ul.tasks::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    background: #eee;
    left: 20px;
    top: -68px;
  }

  ul li.hang {
    margin-bottom: 48px;
  }
  ul li.pie, ul li.bar {
    display: none;
    list-style: none;
  }

  ul li.hang img {
    float: left;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }
</style>
