<template>
  <div class="nav">
    <ul>
      <li class="nav-tag">
        <div class="fingeron" @click="toAddrList"></div>
        <img class="nav-icon" :src="idcard">
        <p :class="clickon == 1?'ontag':'tag'">通讯录</p>
      </li>
      <li class="nav-tag">
        <div class="fingeron" @click="toRegister"></div>
        <img class="nav-icon" :src="carryout">
        <p :class="clickon == 2?'ontag':'tag'">签到</p>
      </li>
      <li class="nav-tag">
        <div class="fingeron" @click="toNotice"></div>
        <img class="nav-icon" :src="bell">
        <p :class="clickon == 3?'ontag':'tag'">消息</p>
      </li>
      <li class="nav-tag">
        <div class="fingeron" @click="toUserinfo"></div>
        <img class="nav-icon" :src="usernav">
        <p :class="clickon == 4?'ontag':'tag'">我的</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      clickon: 0,
      idcard: require('../assets/idcard1.png'),
      carryout: require('../assets/carryout1.png'),
      bell: require('../assets/bell1.png'),
      usernav: require('../assets/usernav1.png')
    }
  },
  props: {
    tagid: Number
  },
  created() {
    if(this.tagid === 1) {
      this.clickon = 1;
      this.idcard = require('../assets/idcard.png');
      this.carryout = require('../assets/carryout1.png');
      this.bell = require('../assets/bell1.png');
      this.usernav = require('../assets/usernav1.png');
    }
    else if(this.tagid === 2) {
      this.clickon = 2;
      this.idcard = require('../assets/idcard1.png');
      this.carryout = require('../assets/carryout.png');
      this.bell = require('../assets/bell1.png');
      this.usernav = require('../assets/usernav1.png');
    }
    else if(this.tagid === 3) {
      this.clickon = 3;
      this.idcard = require('../assets/idcard1.png');
      this.carryout = require('../assets/carryout1.png');
      this.bell = require('../assets/bell.png');
      this.usernav = require('../assets/usernav1.png');
    }
    else if(this.tagid === 4) {
      this.clickon = 4;
      this.idcard = require('../assets/idcard1.png');
      this.carryout = require('../assets/carryout1.png');
      this.bell = require('../assets/bell1.png');
      this.usernav = require('../assets/usernav.png');
    }
  },
  methods: {
    toAddrList: function() {
      this.$router.push({
        name: "AddrList",
        params: {
          pageNum: 1,
          search_conditionid: '0',
          search_conditionval: ''
        }
      });
    },
    toRegister: function() {
      // this.$toast('该功能暂未开放');
      this.$router.push("/register");
    },
    toNotice: function() {
      // this.$toast('该功能暂未开放');
      this.$router.push("/notice");
    },
    toUserinfo: function() {
      this.$router.push({
        path: "/userinfo",
        query: {
          edit: 0
        }
      });
    }
  }
}
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.16rem 0;
  box-shadow: 0 0 0.2rem #dedede;
  background: #fff;
  z-index: 99;
}

.nav-tag {
  position: relative;
  float: left;
  width: 25%;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  list-style: none;
  text-align: center;
}

.nav-icon {
  width: 0.9rem;
  margin-bottom: -0.16rem;
}

.tag {
  font-size: 0.32rem;
  color: #909399;
}

.ontag {
  font-size: 0.32rem;
  color: #f39839;
}

.fingeron {
  position: absolute;
  left: 0;
  right: 0;
  width: 60%;
  height: 100%;
  margin: auto;
  border-radius: 0.6rem;
  z-index: 100;
}
</style>
