<template lang="html">
    <div class="login-body">
        <div class="login">
          <div class="login-triangle"></div>

          <h2 class="login-header">登 录</h2>

          <form class="login-container">
            <p><input type="email" v-model="email" placeholder="Email"></p>
            <p><input type="password" v-model="password" placeholder="Password"></p>
            <p>
                <input type="button" @click="handleLogin" value="登 录">
            </p>
          </form>
        </div>
    </div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      set_islogin: 'setIsLogin',
    }),
    handleLogin (e) {
      if (this.email == "" || this.password == "") {
        alert("用户名或密码不能为空")
        return false;
      }
      this.$router.push('/')
      this.set_islogin(true)
    },

  }
}
</script>

<style lang="css">
.login-body {
  background: #456;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
}

.login {
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.login-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.login-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.login input[type="email"],
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #888;
}

.login input[type="submit"] {
  background: #28d;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.login input[type="submit"]:hover {
  background: #17c;
}

/* Buttons' focus effect */
.login input[type="submit"]:focus {
  border-color: #05a;
}
</style>
