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
    </form>
    <button class="login-btn" @click="Login">
      登 录
    </button>
    <p class="loginup"><router-link to='loginup' class="loginup">注册账号</router-link></p>
    <p class="tip">* 仅限忠门籍在榕乡亲注册</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    // 你个小鲨鱼，如果token已经过期了，token2还在呢？？
    if(this.$cookies.get('token2') && this.$cookies.get('infoCheck')==='true') {
      this.$router.push("/addrList");
    }
    else if(this.$cookies.get('token2') && this.$cookies.get('infoCheck')==='false') {
      this.$checkToken();
      this.$router.push({
        path: "/userinfo",
        query: {
          edit: 1
        }
      });
    }
  },
  mounted() {
    // document.getElementsByClassName('form-input')[0].style="font-size: 1rem;";
  },
  methods: {
    Login: function() {
      var _this = this;

      if(_this.loginForm.username == '') {
        this.$toast('请输入用户名');
      }
      else if(_this.loginForm.password == '') {
        this.$toast('密码错误');
      }
      else {
        this.axios({
          url: this.baseUrl + '/user/login',
          method: 'post',
          data: {
            "userName": this.loginForm.username,
            "userPass": this.loginForm.password
          }
        })
        .then((res) => {
          console.log(res);
          // console.log(res.headers);
          // console.log(res.headers['s-token']);
          this.$cookies.set('token', res.headers['s-token'], 3600*24*7);
          this.$cookies.set('token2', res.headers['s-token'], 3600*24*14);
          this.$cookies.set('signCheck', res.data.data.signCheck, 3600*24*7);
          this.$cookies.set('infoCheck', res.data.data.infoCheck, 3600*24*7);
          this.$cookies.set('identity', res.data.data.code, 3600*24*7);
          if(res.status === 200) {
            this.$toast('登录成功');
            var infoCheck = res.data.data.infoCheck;
            if(infoCheck === true) {
              this.$router.push({
                name: "AddrList",
                params: {
                  pageNum: 1,
                  search_conditionid: '0',
                  search_conditionval: ''
                }
              });
            }
            else {
              _this.$router.push({
                path: "/userinfo",
                query: {
                  edit: 1
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
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
