<template>
  <div class="main">
    <div v-if="status1" class="status1" :style="{backgroundImage:'url('+image_bg+')'}">
      <div class="register-btn">
        <div class="border" @click="register">签 到</div>
      </div>
      <p class="message">
        {{message}}
        <br/>
        <span class="time" v-if="unlock">{{time}}</span>
      </p>
    </div>
    <div class="status2" v-if="!status1">
      <header class="head">签到</header>
      <div class="lottery">
        <div class="lottery-div">
          <p class="lottery-code">抽奖码：{{lotteryCode}}</p>
          <p class="tip" v-if="befoDraw">提示：暂未开奖</p>
          <p v-if="!befoDraw">抽奖结果：{{lotteryResult}}</p>
        </div>
      </div>
      <div class="donation">
        <p>交费金额：</p>
        <div class="donation-div">
          <p class="donation-num"><span class="rmb">￥ </span></p>
          <input type="number" class="donation-input" placeholder="0.00" v-model="donationNum" :disabled="!editstatus" @blur="focusState = false" v-focus="focusState">
        </div>
        <div class="donation-btn" v-if="editstatus" @click="donation">确认交费</div>
        <div class="donation-btn change-num" v-if="!editstatus" @click="changeNum">修改金额</div>
      </div>
    </div>
    <Navigation :tagid="2"></Navigation>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'AddrList',
  data () {
    return {
      image_bg: require('../assets/df.png'),
      status1: true,
      lotteryCode: '',
      befoDraw: true,
      lotteryResult: '',
      donationNum: '',
      editstatus: true,
      focusState: false,
      message: '',
      time: '',
      unlock: false
    }
  },
  components: {
    Navigation
  },
  created() {
    var _this = this;
    if(this.$cookies.get('signCheck') === 'true') {
      this.axios({
        url: this.baseUrl + '/lottery',
        method: 'get'
      })
      .then(function(res) {
        console.log(res);
        _this.lotteryCode = res.data.data.lotteryCode;
        if(res.data.data.lotteryResult) {
          // 抽奖结果产生
          _this.befoDraw = false;
          if(res.data.data.lotteryResult === "special") {
            _this.lotteryResult = "特等奖";
          }
          else if(res.data.data.lotteryResult === "first") {
            _this.lotteryResult = "一等奖";
          }
          else if(res.data.data.lotteryResult === "second") {
            _this.lotteryResult = "二等奖";
          }
          else if(res.data.data.lotteryResult === "third") {
            _this.lotteryResult = "三等奖";
          }
          else if(res.data.data.lotteryResult === "nothing") {
            _this.lotteryResult = "未中奖";
          }
        }
        _this.status1 = false;
      })
      .catch(function(error) {
        console.log(error);
      });

      this.axios({
        url: this.baseUrl + '/donation',
        method: 'get'
      })
      .then(function(res) {
        console.log(res);
        if(res.data.data >= 0) {
          _this.donationNum = res.data.data;
          _this.editstatus = false;
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    }
    else {
      this.status1 = true;
      this.axios({
        url: this.baseUrl + '/sign',
        method: 'get'
      })
      .then(function(res) {
        console.log(res.data);
        if(!res.data.data) {
          _this.message = '暂时没有签到活动'
        }
        else {
          var beginy, beginm, begind, beginhour, beginminute;
          var endy, endm, endd, endhour, endminute;

          let begintime = res.data.data.signBeginTimestamp;
          begintime = parseInt(begintime*1000);
          let begindate = new Date(begintime);
          beginy = begindate.getFullYear();
          let MM = begindate.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          beginm = MM;
          let d = begindate.getDate();
          d = d < 10 ? ('0' + d) : d;
          begind = d;
          beginhour = begindate.getHours()<10?('0'+begindate.getHours()):begindate.getHours();
          beginminute = begindate.getMinutes()<10?('0'+begindate.getMinutes()):begindate.getMinutes();

          let endtime = res.data.data.signEndTimestamp;
          endtime = parseInt(endtime*1000);
          let enddate = new Date(endtime);
          endy = enddate.getFullYear();
          MM = enddate.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          endm = MM;
          d = enddate.getDate();
          d = d < 10 ? ('0' + d) : d;
          endd = d;
          endhour = enddate.getHours()<10?('0'+enddate.getHours()):enddate.getHours();
          endminute = enddate.getMinutes()<10?('0'+enddate.getMinutes()):enddate.getMinutes();

          _this.message = '签到时间'
          _this.time = beginm+'-'+begind+' '+beginhour+':'+beginminute+' -- '+endm+'-'+endd+' '+endhour+':'+endminute;
          _this.unlock = true;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  watch: {
    donationNum(val) {
      var re = /^\d+\.?\d{0,2}$/;
      // console.log(re.test(val));
      if(re.test(val)) {

      }else {
        this.$toast('金额格式错误');
      }
    }
  },
  methods: {
    register: function() {
      var _this = this;
      this.axios({
        url: this.baseUrl + '/sign/check',
        method: 'get'
      })
      .then(function(res) {
        console.log(res);
        _this.$toast('签到成功');
        setTimeout(function() {
          _this.axios({
            url: _this.baseUrl + '/lottery',
            method: 'get'
          })
          .then(function(res) {
            // console.log(res);
            _this.lotteryCode = res.data.data.lotteryCode;
            if(res.data.data.lotteryResult) {
              _this.befoDraw = false;
              _this.lotteryResult = res.data.data.lotteryResult;
            }
            _this.$cookies.set('signCheck', 'true', 3600*24*8);
          })
          .catch(function(error) {
            console.log(error);
          })
          _this.status1 = false;
        }, 1000);
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    donation: function() {
      var _this = this;

      var re = /^\d+\.?\d{0,2}$/;
      // console.log(re.test(_this.donationNum));

      if(re.test(_this.donationNum)) {
        this.axios({
          url: this.baseUrl + '/donation/update?donationNumber=' + _this.donationNum,
          method: 'post'
        })
        .then(function(res) {
          // console.log(res);
          _this.$toast('感谢您的赞助');
          _this.editstatus = !_this.editstatus;
        })
        .catch(function(error) {
          console.log(error);
        })

      }else {
        this.$toast('金额格式错误');
      }
    },
    changeNum: function() {
      this.editstatus = !this.editstatus;
      this.focusState = true;
    }
  },
  directives: {
    focus: {
      //根据focusState的状态改变是否聚焦focus
      update: function (el, value) {    //第二个参数传进来的是个json
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 0.52rem;
}

.status1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat;
  background-size: 100% 94%;
  z-index: 90;
}

.register-btn {
  position: absolute;
  top: 3.9rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 50%;
  background: hsla(32, 92%, 58%, 0.8);
}

.border {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  border: 0.084rem solid #fff4e7b3;
  border-radius: 50%;
  font-size: 1rem;
  color: #fffaf4e6;
  background: transparent;
}

.message {
  position: absolute;
  top: 9rem;
  left: 0;
  right: 0;
  margin: auto;
  color: #bb5c36;
}

.time {
  display: inline-block;
  margin-top: 0.3rem;
}

.head {
  position: relative;
  width: 100%;
  padding: 0.28rem 0;
  border-bottom: 1px solid #f4f4f4;
  color: #f39839;
  background-color: #fff;
}

.lottery {
  padding: 0.6rem 0.4rem;
  padding-bottom: 0.7rem;
  border-top: 3px solid #f4f4f4;
  border-bottom: 4px solid #f4f4f4;
  font-size: 0.6rem;
  font-weight: bold;
}

.lottery-div {
  width: 5.6rem;
  margin: auto;
  text-align: left;
}

.lottery-code {
  display: inline-block;
  margin-bottom: 0.32rem;
  font-size: 0.6rem;
}

.tip {
  line-height: 0.8rem;
  font-size: 0.44rem;
  font-weight: normal;
  text-align: center;
  color: #909399;
}

.donation {
  width: 5.6rem;
  margin: 1rem auto;
  text-align: left;
  font-size: 0.6rem;
}

.donation-div {
  position: relative;
  width: 100%;
  height: 1rem;
  line-height: 1.02rem;
  margin-top: 0.4rem;
  border: 1px solid #909399;
  border-radius: 0.08rem;
  font-weight: bold;
}

.rmb {
  margin-left: 0.14rem;
}

.donation-input {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.14rem;
  padding: 0.15rem 0.15rem;
  padding-left: 0.91rem;
  border: none;
  border-radius: 0.08rem;
  font-size: 0.6rem;
  font-weight: bold;
  background: transparent;
}

.donation-btn {
  width: 100%;
  line-height: 1rem;
  margin-top: 0.66rem;
  border: 1px solid #b74620;
  border-radius: 0.08rem;
  text-align: center;
  font-size: 0.58rem;
  color: #fff;
  background-color: #b74620;
}

.change-num {
  border: 1px solid #f39839;
  background-color: #f39839;
}
</style>
