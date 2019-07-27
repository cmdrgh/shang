<template>
  <div class="main">

<!--<img src="./../static/img/flower1.png" class="back-img flower1">
    <img src="./../static/img/flower2.png" class="back-img flower2">
    <img src="./../static/img/flower3.png" class="back-img flower3">
    <img src="./../static/img/flower3.png" class="back-img flower4">
    <img src="./../static/img/flower4.png" class="back-img flower5">
    <img src="./../static/img/flower6.png" class="back-img flower7">
    <img src="./../static/img/flower5.png" class="back-img flower6">-->
    <img src="../assets/flower1.png"  class="back-img flower1">
    <img src="../assets/flower2.png"  class="back-img flower2">
    <img src="../assets/flower3.png"  class="back-img flower3">
    <img src="../assets/flower3.png"  class="back-img flower4">
    <img src="../assets/flower4.png"  class="back-img flower5">
    <img src="../assets/flower6.png"  class="back-img flower7">
    <img src="../assets/flower5.png"  class="back-img flower6">
<!--<img v-bind:src="imgUrl2[0]"  class="back-img flower1">
    <img v-bind:src="imgUrl2[1]"  class="back-img flower2">
    <img v-bind:src="imgUrl2[2]"  class="back-img flower3">
    <img v-bind:src="imgUrl2[2]"  class="back-img flower4">
    <img v-bind:src="imgUrl2[3]"  class="back-img flower5">
    <img v-bind:src="imgUrl2[5]"  class="back-img flower7">
    <img v-bind:src="imgUrl2[4]"  class="back-img flower6">-->

    <div class="header">
      <p class="return" @click="reback()">&lt; 返回</p>

    <div class="block">
      字体大小设置：<el-slider v-model="value1" :max="50" :format-tooltip="formatTooltip" :change="changeFontsize()"></el-slider>
    </div>

      <p class="title">幸运大抽奖</p>

      <div class="btn-div">
        <el-button @click="setlevel('special')" circle style="background: #b81d25; color: #ffeecc;">特</el-button>
        <el-button @click="setlevel('first')" circle style="background: #b81d25; color: #ffeecc;">一</el-button>
        <el-button @click="setlevel('second')" circle style="background: #b81d25; color: #ffeecc;">二</el-button>
        <el-button @click="setlevel('third')" circle style="background: #b81d25; color: #ffeecc;">三</el-button>
      </div>

    </div>
    <div class="result-div">
      <p class="level">{{level}} ({{curNum}}/{{tolNum}})</p>
      <div v-if="flag" class="result">
        <!-- <Num v-for="(item, index) in result" v-bind:key="index" :vv="item.lotteryCode"></Num> -->
        <div v-for="(item, index) in result" v-bind:key="index" class="lottery-div">
          <child ref="headerChild1" :vv="item.lotteryCode"></child>
          <span class="lotteryname" v-bind:style="{fontSize:nameFont,lineHeight:lineheight}" v-show="userInfoName">{{item.userInfoName}}</span>
        </div>

      </div>
    </div>
    <transition name="fade">
    <div>
      <el-button @click="reset()" :disabled="btn" class="re-btn" circle style="font-size: 28px; font-weight: normal;">{{raffleName}}</el-button>
    </div>
    </transition>

  </div>
</template>

<script>
import Child from './num'

export default {
  name: "AdminRaffle2",
  data() {
    return {
      imgUrl2:[
        "./../static/img/flower1.png",
        "./../static/img/flower2.png",
        "./../static/img/flower3.png",
        "./../static/img/flower4.png",
        "./../static/img/flower5.png",
        "./../static/img/flower6.png",
        ],
      imgUrl:[
        "~@/assets/flower1.png",
        "~@/assets/flower2.png",
        "~@/assets/flower3.png",
        "~@/assets/flower4.png",
        "~@/assets/flower5.png",
        "~@/assets/flower6.png",
        ],

      lineheight: "47px",
      nameFont:"24px",
      lfont: "10px",
      clientWidth: document.body.clientWidth,
      value1: 10,
      btn: false,
      raffleName: "抽奖",
      flag: false,  // 控制抽奖结果的显示，去掉会影响动画
      level: '特等奖',
      result: [], // 存放当前显示的数据的数组
      value: 'special',
      userInfoName: false,  // 是否显示名字

      specialNum: 0,
      firstNum: 0,
      secondNum: 0,
      thirdNum: 0,
      specialCur: 0,
      firstCur: 0,
      secondCur: 0,
      thirdCur: 0,
      curNum: 0,
      tolNum: 0
    };
  },
  mounted() {
    this.bodychange()
    // 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
    const _this = this;
    console.log(this)
    window.onresize=function temp(){
      _this.bodychange();
    }
  },
  components: {
    Child
  },
  created() {
    this.axios({
      url: this.baseUrl+ "/lottery/prize",
      method: "get",
    })
    .then(res => {

      // console.log(this);
      var _this=this
      var prizeNum = res.data.data;
      if(prizeNum.lotterySpecial==null && prizeNum.lotteryFirst==null
      && prizeNum.lotterySecond==null && prizeNum.lotteryThird==null){  // 如果还未设置奖品数量
        this.$message({  // 错误提示
          type: "warning",
          message: "您还未设置奖品数量！"
        });
        this.$router.push({  // 且跳回设置奖品的页面
          path: "/admin/raffle"
        });
      }
      else {
        this.$confirm('是否需要清空之前抽奖记录？', '提示', {  // 无论是否抽过奖都询问是否清空抽奖记录
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            url: this.baseUrl + '/lottery/clear',
            method: 'get'
          })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '清空成功!'
            });
            this.getNum();
          })
          .catch((error) => {
            console.log(error);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          this.getNum();
          this.start();
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    sonchange: function () {
      this.clientWidth = document.body.clientWidth;
      var size=parseInt(this.clientWidth/45*this.value1/10)
      var len = document.getElementsByClassName('wrap').length;
      for(var i=0; i<len; i++) {
        document.getElementsByClassName('wrap')[i].style="font-size: "+ size +"px;"+"height: "+ size*7/5+"px;"+"width: "+ size*3/5+"px;";
      }
      var len = document.getElementsByTagName('li').length;
      for(var i=0; i<len; i++) {
        document.getElementsByTagName ('li')[i].style="height: "+ size*7/5+"px;"+"line-height: "+ size*7/5+"px;"+"width: "+ size*3/5+"px;";
      }
    },
    bodychange: function() {
      this.clientWidth = document.body.clientWidth;
      var fontsize=parseInt(this.clientWidth/45*this.value1/10)
      this.lineheight=fontsize*7/5+"px"
      this.nameFont=fontsize+"px"
      this.sonchange()
      //console.log(fontsize)
      //if(this.$refs.headerChild1!=null&&this.$refs.headerChild1.length>0)
      //this.$refs.headerChild1[0].fontsizeSet(fontsize)
    },
    formatTooltip(val) {
        return val / 10;
    },
    getNum: function() { // 获取当前的抽奖进度
      var _this = this;
      $.ajax({
        url: this.baseUrl + '/lottery/drawProgress',
        method: 'get',
        headers: {
          'S-TOKEN': this.$cookies.get('token2')
        },
        async: false,
        dataType: "json",
        success: function(res) {
          // console.log(res);
          var drawProgress = res.data;
          _this.specialNum = drawProgress.specialMaxPage;
          _this.firstNum = drawProgress.firstMaxPage;
          _this.secondNum = drawProgress.secondMaxPage;
          _this.thirdNum = drawProgress.thirdMaxPage;
          _this.specialCur = drawProgress.specialPage;
          _this.firstCur = drawProgress.firstPage;
          _this.secondCur = drawProgress.secondPage;
          _this.thirdCur = drawProgress.thirdPage;

          _this.curNum = _this[_this.value+'Cur'];
          _this.tolNum = _this[_this.value+'Num'];
        },
        error: function(err) {
          console.log(err);
        }
      })
    },
    start: function() {  // 获取抽奖结果
      var _this=this
      this.raffleName="抽奖"
      this.flag = false;
      this.btn = false;
      this.userInfoName=false
      if(this.curNum != 0) {
        this.axios({
          url: this.baseUrl + 'lottery/drawSearch',
          method: 'post',
          data: {
            "lotteryPage": this.curNum,
            "type": this.value
          }
        })
        .then((res) => {
          console.log('获取中...');
          if(res.data.data.result.length !== 0) {
            this.$set(this.$data, 'result', res.data.data.result);
            this.flag = true;
            setTimeout(function() {
              _this.userInfoName = true;
            }, 1500)
          }
          if(this.curNum === this.tolNum) this.btn = true;
          else this.btn = false;
        })
        .catch((error) => {
          if(error)console.log(error);
        })
      }
    },
    reset: function() {  //点击抽奖
      var _this=this;
      if(this.curNum < this.tolNum) {
        this.raffleName="抽奖中"
        this.btn=true;
        this.flag = false;
        this.userInfoName = false;
        this.axios({
          url: this.baseUrl + '/lottery/draw',
          method: 'post',
          data: {
            "lotteryPage": this.curNum+1,
            "type": this.value
          }
        })
        .then((res) => {
          console.log('抽奖中...');
          this[this.value+'Cur'] ++;
          this.curNum ++;
          this.flag = true;
          this.start();
          setTimeout(function(){
            //_this.userInfoName = true;
            _this.raffleName="抽奖";
          },1200);

          // console.log(this.flag);
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
    reback: function() {  //返回上一页
      this.$router.go(-1);
    },
    setlevel(val) {  //选择抽奖等级
      this.flag = false;
      // console.log(val);
      if(val === 'special') {
        this.level = '特等奖';
      }
      else if(val === 'first') {
        this.level = '一等奖';
      }
      else if(val === 'second') {
        this.level = '二等奖';
      }
      else if(val === 'third') {
        this.level = '三等奖';
      }
      this.value = val;
      this.curNum = this[this.value+'Cur'];
      this.tolNum = this[this.value+'Num'];
      this.start();
      console.log("tes")
      var _this=this
      setTimeout(function(){
        _this.sonchange()
      },1500);
    },
    changeFontsize() {
      this.bodychange();
    }
  }
};
</script>
<style scoped>
.el-button.is-circle {
  border-color: transparent;
  border-radius: 50%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
}
.el-button.is-circle:hover {
  border-color: hsla(40, 100%, 90%, 0.8);
  background-image: none;
  background: linear-gradient(to top, #c76828, #f1c18b);
  color: #55270d;
}


.block {
  position: absolute;
  top: 50px;
  left: 200px;
  width: 150px;
  font-size: 16px;
  color: #ffeecc;
}

.main {
  position: relative;
  width: 100%;
  min-width: 800px;
  height: 100%;
  background-color: #b81d25;
  overflow: hidden;
}

.back-img {
  position: absolute;
  width: 280px;
  opacity: 0.8;
}

.flower1 {
  top: 0;
  left: 0;
}
.flower2 {
  bottom: 0;
  left: 0;
  width: 440px;
}
.flower3 {
  bottom: 0;
  right: 0;
  width: 250px;
}
.flower4 {
  bottom: -60px;
  right: 180px;
  width: 250px;
  transform:rotate(50deg);
  -ms-transform:rotate(50deg); 	/* IE 9 */
  -moz-transform:rotate(50deg); 	/* Firefox */
  -webkit-transform:rotate(50deg); /* Safari 和 Chrome */
  -o-transform:rotate(50deg); 	/* Opera */
}
.flower5 {
  top: -10px;
  left: 30px;
  width: 200px;
}
.flower6 {
  top: -5px;
  right: 20px;
  width: 250px;
}
.flower7 {
  top: 230px;
  right: -30px;
  width: 160px;
}

.header {
  margin-top: 46px;
  font-size: 18px;
}

.select {
  position: absolute;
  top: 52px;
  right: 280px;
  width: 100px;
  opacity: 0.9;
}

.return {
  position: absolute;
  top: 60px;
  left: 64px;
  color: #fff;
  z-index: 99;
  cursor: pointer;
  font-size: 15px;
}

.title {
  text-align: center;
  font-size: 32px;
  letter-spacing: 2px;
  color: #ffeecc;
}

.btn-div {
  position: absolute;
  top: 50px;
  right: 250px;
}

.result-div {
  width: 76%;
  height: 75%;
  padding: 0 60px;
  margin: 40px auto;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.result-div::-webkit-scrollbar {
  display: none;
}

.level {
  display: block;
  margin: 25px auto;
  font-size: 32px;
  color: #ffeecc;
}

.result {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.lottery-div {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 50px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #ffeecc;
}

.btn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 32px;
  width: 160px;
  height: 160px;
  border-color: #b81d25;
  color: #55270d;
  background: linear-gradient(to top, #c76828, #f1c18b);
  box-shadow: 6px 8px 40px rgba(0, 0, 0, 0.2);
  z-index: 99;
}
.lotteryname{
  margin: 15px;
}

.re-btn {
  position: absolute;
  bottom: 50px;
  right: 50px;
  font-size: 24px;
  width: 120px;
  height: 120px;
  border-color: transparent;
  color: #55270d;
  background: linear-gradient(to top, #c76828, #f1c18b);
  box-shadow: 6px 8px 50px rgba(0, 0, 0, 0.3);
  z-index: 99;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
