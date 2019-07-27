<template>
  <div class="main">
    <img class="login-background" src="../assets/loginback.png">
    <form :model="loginForm">
      <div class="form-div">
        <img class="icon" src="../assets/usericon.png">
        <input v-model="loginForm.username" name="username" class="form-input" placeholder="用户名" type="text">
      </div>
      <div class="form-div">
        <img class="icon" src="../assets/passwordicon.png">
        <input v-model="loginForm.password" name="password" class="form-input" placeholder="密码" type="password">
      </div>
      <div class="form-div">
        <img class="icon" :src="checkpassword">
        <input v-model="check" name="check" class="form-input" placeholder="确认密码" type="password">
      </div>
    </form>
    <button class="login-btn" @click="LoginUp">
      注 册
    </button>
    <p class="loginup"><router-link to='login' class="loginup">已有账号，去登录</router-link></p>
    <p class="tip">* 仅限忠门籍在榕乡亲注册</p>

  </div>
</template>

<script>

export default {
  name: 'Loginup',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      checkpassword: require('../assets/checkpassword.png'),
      check: ''
    }
  },

  computed: {
    userpassword() {
      return this.loginForm.password;
    }
  },

  watch: {
    userpassword(val) {
      this.checkpassword  = require('../assets/checkpassword.png')
      this.check = ''
    },

    check(val) {
      if(this.check.length >= this.loginForm.password.length) {
        if(this.check == this.loginForm.password) {
          this.checkpassword = require('../assets/checkpassword1.png')
        }
        else {
          this.checkpassword = require('../assets/checkpassword2.png')
        }
      }
      else {
        this.checkpassword = require('../assets/checkpassword.png')
      }
    }
  },
  methods: {
    LoginUp: function() {
      var _this = this;

      if(this.loginForm.username == ''){
        this.$toast('请输入用户名');
      }
      else if(this.loginForm.password == ''){
        this.$toast('请输入密码');
      }
      else if(this.checkpassword != require('../assets/checkpassword1.png')) {
        this.$toast('请确认密码');
      }

      if(this.loginForm.username !='' && this.loginForm.password != '' && this.checkpassword == require('../assets/checkpassword1.png')) {
        this.axios({
          url: this.baseUrl + '/user/register',
          method: 'post',
          data: {
            "userName": this.loginForm.username,
            "userPass": this.loginForm.password
          }
        })
        .then(function(res) {
          // console.log(res);
          if(res.status == 200) {
            _this.$toast('注册成功');
            setTimeout(function() {
              _this.$router.push("/login");
            }, 1000);
          }
        })
        .catch(function(error) {
          // console.log(error);
          _this.$toast('该用户名已被注册');
        })
      }

    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}

.login-background {
  width: 100%;
}

.icon {
  width: 1rem;
  margin-right: 0.2rem;
  margin-bottom: -0.36rem;
}

.form-div {
  padding-left: 1.24rem;
  margin-bottom: 0.8rem;
  text-align: left;
}

.form-input {
  width: 66%;
  padding: 6px;
  font-size: 0.6rem;
  border: none;
  border-bottom: 1px solid #DCDFE6;
}

.login-btn {
  width: 80%;
  padding: 0.16rem 0;
  margin: 0.3rem 0;
  margin-bottom: 0.6rem;
  font-size: 0.6rem;
  border: none;
  border-radius: 1rem;
  background-color: #f39839;
  color: #fff;
}

.loginup {
  font-size: 0.46rem;
  color: #606266;
  text-decoration: none;
}

.break {
  margin: 0 0.3rem;
}

.tip {
  margin: 0.5rem auto;
  font-size: 0.46rem;
  color: #b74620;
}
</style>
