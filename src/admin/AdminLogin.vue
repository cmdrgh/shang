<template>
  <div class="main">
    <div class="container">
      <img src="../assets/title.png" class="logo">
      <input v-model="adminname" type="text" placeholder="管理员账号" class="input">
      <div class="password-div">
        <img :src="eye" class="icon" @click="showpassword_fun">
        <input v-model="password" :type="showpassword" @keyup.enter="login" placeholder="密码" class="input">
      </div>
      <button @click="login" class="btn">
        登 录
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      imgUrl:"./../static/img/title.png",
      adminname: '',
      password: '',
      showpassword: 'password',
      eye: require('../assets/eyeicon1.png')
    }
  },
  created() {
    if(this.$cookies.get('token2')) {
      this.$router.push("/admin/user_management");
    }
  },
  methods: {
    showpassword_fun: function() {
      if(this.showpassword === 'password') {
        this.eye = require('../assets/eyeicon2.png');
        this.showpassword = 'type'
      }
      else {
        this.eye = require('../assets/eyeicon1.png');
        this.showpassword = 'password'
      }
    },
    login: function() {
      var _this = this;
      if(this.adminname == '') {
        this.$message({
          message: '请输入管理员账号',
          type: 'warning',
          duration: 1000
        });
      }
      else if(this.password == '') {
        this.$message({
          message: '请输入密码',
          type: 'warning',
          duration: 1000
        });
      }
      else {
        this.axios({
          url: this.baseUrl + '/user/login',
          method: 'post',
          data: {
            "userName": this.adminname,
            "userPass": this.password
          }
        })
        .then((res) => {
          console.log('登录中...');
          // console.log(res);
          // console.log(res.headers);
          // console.log(res.headers['s-token']);
          this.$cookies.set('token', res.headers['s-token'], 3600*24*7);
          this.$cookies.set('token2', res.headers['s-token'], 3600*24*14);
          this.$cookies.set('adminname', _this.adminname, 3600*24*7);
          this.$cookies.set('signCheck', res.data.data.signCheck, 3600*24*7);
          this.$cookies.set('infoCheck', res.data.data.infoCheck, 3600*24*7);
          this.$cookies.set('identity', res.data.data.code, 3600*24*7);
          if(res.status === 200) {
            // console.log(typeof(this.$cookies.get('identity')));
            if(this.$cookies.get('identity') === '10001' || this.$cookies.get('identity') === '10002') {
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1000
              });
              this.$router.push("/admin/user_management");
            }
            else {
              this.$message.error('您没有管理员权限');
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
  min-width: 1301px;
  min-height: 701px;
  width: 100%;
  height: 100%;
  background: #fff;
}

.container {
  position: absolute;
  top: 130px;
  left: 0;
  right: 0;
  width: 340px;
  height: 360px;
  margin: auto;
  text-align: center;
}

.logo {
  width: 280px;
}

.password-div {
  position: relative;
}

.icon {
  position: absolute;
  top: 22px;
  right: 14px;
  width: 24px;
  z-index: 3;
  cursor: pointer;
}

.input {
  width: 314px;
  height: 26px;
  padding: 10px 12px;
  margin: 10px 0;
  border-radius: 3px;
  border: 1px solid #DCDFE6;
  font-size: 15px;
  background-color: transparent;
}

.input::-webkit-input-placeholder {
    color: #C0C4CC;
}
.input:-moz-placeholder {
    color: #C0C4CC;
}
.input:-ms-input-placeholder {
    color: #C0C4CC;
}

.btn {
  width: 100%;
  height: 46px;
  line-height: 42px;
  margin: 20px 0;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  color: #fff;
  background-color: #40a0ffcc;
  cursor: pointer;
}
.btn:hover {
  transition: 0.3s;
  background-color: #40a0ff;
}
</style>
