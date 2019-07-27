<template>
  <div class="main">
    <div class="header" >
      <p class="return" @click="reback()">&lt; 返回</p>
      <div class="block">
        字体大小设置：<el-slider v-model="value1" :max="30" :format-tooltip="formatTooltip" :change="changeFontsize()"></el-slider>
      </div>
      <p v-bind:style="{fontSize:titleFont}" class="title">忠门籍在榕乡亲交费榜（{{minNum}}元以上）</p>
    </div>
    <div class="result-div">
      <!-- <div class="ranking-list">
        <p class="town-name">山亭镇</p>
        <div class="topthree">
          <div class="fst">
            <img src="../assets/fst2.png" class="fst-icon">
            <p class="fst-name">{{st[1].userInfoName}}</p>
            <p>{{st[1].donationNumber}}</p>
          </div>
          <div class="fst">
            <img src="../assets/fst1.png" class="fst-icon">
            <p class="first-name">{{st[0].userInfoName}}</p>
            <p>{{st[0].donationNumber}}</p>
          </div>
          <div class="fst">
            <img src="../assets/fst3.png" class="fst-icon">
            <p class="fst-name">{{st[2].userInfoName}}</p>
            <p>{{st[2].donationNumber}}</p>
          </div>
        </div>
        <div class="others">
          <p class="list" v-for="(item, index) in showData1" v-bind:key="index">
            {{pageSize*n1 + index + 4}}
            <span class="name">{{item.userInfoName}}</span>
            <span class="num">{{item.donationNumber}} 元</span>
          </p>
        </div>
      </div> -->
      <RankingList ref="headerChild1" :townname="st" :minNum="minNum"></RankingList>
      <RankingList ref="headerChild2" :townname="zm" :minNum="minNum"></RankingList>
      <RankingList ref="headerChild3" :townname="dp" :minNum="minNum"></RankingList>
      <RankingList ref="headerChild4" :townname="yt" :minNum="minNum"></RankingList>
    </div>
  </div>
</template>

<script>
import RankingList from './RankingList.vue'
import $ from 'jquery'

export default {
  name: "AdminRanking",
  data() {
    return {
      value1: 10,
      titleFont: "30px",
      clientWidth: document.body.clientWidth,
      value: 42,
      pageSize: 2,
      minNum: 0,
      timer: '',
      st: "山亭",
      zm: "忠门",
      dp: "东埔",
      yt: "月塘"
    };
  },
  mounted() {
    this.bodychange()
    // 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
    const _this = this;
    window.onresize=function temp(){
      _this.bodychange();
    }
  },
  components: {
    RankingList
  },
  created() {
    this.minNum = this.$route.query.minNum;  // 从父组件接受的参数
    console.log(this)
    // this.axios({
    //   url: this.baseUrl + '/donation/rank?minNumber=' + 1,
    //   method: 'get'
    // })
    // .then((res) => {
    //   console.log(res);

    //   initail(this, res.data.data, '山亭');
    //   initail(this, res.data.data, '忠门');
    //   initail(this, res.data.data, '东埔');

    //   initailData(this, "山亭");
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  },
  methods: {
     bodychange: function() {
        this.clientWidth = document.body.clientWidth;
        var scale=document.body.clientWidth*this.value1/10;
        this.titleFont=parseInt(scale/45)+"px";
        var fontsize=parseInt(scale/60)+"px";
        var topfont=parseInt(scale/53)+"px";
        var spanwidth=parseInt(scale/5.9)+"px";
        var namewidth=parseInt(scale/5.9*0.44)+"px";
        var numwidth=parseInt(scale/5.9*0.50)+"px";
        if(this.$refs.headerChild1!=null){
          this.$refs.headerChild1.topFont=topfont;
          this.$refs.headerChild2.topFont=topfont;
          this.$refs.headerChild3.topFont=topfont;
          this.$refs.headerChild4.topFont=topfont;
          this.$refs.headerChild1.fontWidth=fontsize;
          this.$refs.headerChild2.fontWidth=fontsize;
          this.$refs.headerChild3.fontWidth=fontsize;
          this.$refs.headerChild4.fontWidth=fontsize;
          this.$refs.headerChild1.spanWidth=spanwidth;
          this.$refs.headerChild2.spanWidth=spanwidth;
          this.$refs.headerChild3.spanWidth=spanwidth;
          this.$refs.headerChild4.spanWidth=spanwidth;
          this.$refs.headerChild1.nameWidth=namewidth;
          this.$refs.headerChild2.nameWidth=namewidth;
          this.$refs.headerChild3.nameWidth=namewidth;
          this.$refs.headerChild4.nameWidth=namewidth;
          this.$refs.headerChild1.numWidth=numwidth;
          this.$refs.headerChild2.numWidth=numwidth;
          this.$refs.headerChild3.numWidth=numwidth;
          this.$refs.headerChild4.numWidth=numwidth;
        }
    },
    formatTooltip(val) {
        return val / 10;
    },
    changeFontsize() {
      this.bodychange();
    },
    reback: function(){
      this.$router.push("/admin/payment_management");
    },
    // a() {
    //   this.value ++
    //   console.log(this.value)
    //   setTimeout(this.a,1000)
    // },
    // getInfo() {
    //   var _this = this;
    //   this.n1 ++;
    //   if(this.n1 > this.total1) {
    //     this.n1 = 0;
    //     $.ajax({
    //       url: this.baseUrl + '/donation/rank?minNumber=' + 1,
    //       method: 'get',
    //       headers: {
    //         'S-TOKEN': this.$cookies.get('token2')
    //       },
    //       async: false,
    //       dataType: "json",
    //       success: function(res) {
    //         console.log(res.data);
    //         initail(_this, res.data, '山亭');
    //       },
    //       error: function(err) {
    //         console.log(err);
    //       }
    //     })
    //   }
    //   var len;
    //   if(this.n1 === this.total1) {
    //     len = this.DataTable1.length%this.pageSize;
    //   }
    //   else {
    //     len = this.pageSize;
    //   }
    //   console.log("第"+this.n1+"次"+len);
    //   this.showData1 = [];
    //   for(var j=0, i=this.n1*this.pageSize; i<this.n1*this.pageSize+len; j++, i++) {
    //     this.$set(this.showData1, j, this.DataTable1[i]);
    //   }
    //   console.log("第"+this.n1+"次"+this.showData1);
    // }
  },
  // mounted() {
  //   this.timer = setInterval(this.getInfo,5000);
  // },
  // beforeDestroy() { //清除定时器
  //   clearInterval(this.timer);
  //   console.log("beforeDestroy");
  // },
  // destroyed() { //清除定时器
  //   //clearInterval(this.timer);
  //   console.log("destroyed");
  // }

};

function initail(Vm, res, name) {
  var len = res.donationRankMap[name].length;
  len<3 ? len = len : len = 3;

  var lens = res.donationRankMap[name].length;
  if(name === "山亭") {
    for(var i=0; i<len; i++) {
      if(res.donationRankMap[name][i]) {
        // console.log(res.donationRankMap[name][i]);
        Vm.$set(Vm.st, i, res.donationRankMap[name][i]);
      }
    }
    for(var i=3; i<lens; i++) {
      Vm.$set(Vm.DataTable1, i-3, res.donationRankMap[name][i]);
    }
  }
  else if(name === "忠门") {
    for(var i=0; i<len; i++) {
      if(res.donationRankMap[name][i]) {
        // console.log(res.donationRankMap[name][i]);
        Vm.$set(Vm.zm, i, res.donationRankMap[name][i]);
      }
    }
    Vm.total2 = parseInt((lens-3)/Vm.pageSize);
    for(var i=3; i<lens; i++) {
      Vm.DataTable2[i-3] = res.donationRankMap[name][i];
    }
  }
  else if(name === "东埔") {
    for(var i=0; i<len; i++) {
      if(res.donationRankMap[name][i]) {
        // console.log(res.donationRankMap[name][i]);
        Vm.$set(Vm.dp, i, res.donationRankMap[name][i]);
      }
    }
    Vm.total3 = parseInt((lens-3)/Vm.pageSize);
    for(var i=3; i<lens; i++) {
      Vm.DataTable3[i-3] = res.donationRankMap[name][i];
    }
  }
  else if(name === "月塘") {
    for(var i=0; i<len; i++) {
      if(res.donationRankMap[name][i]) {
        // console.log(res.donationRankMap[name][i]);
        Vm.$set(Vm.yt, i, res.donationRankMap[name][i]);
      }
    }
    Vm.total4 = parseInt((lens-3)/Vm.pageSize);
    for(var i=3; i<lens; i++) {
      Vm.$set(Vm.DataTable4, i-3, res.donationRankMap[name][i]);
    }
  }
}

function initailData(Vm, name) {
  var len=0;
  if(name === "山亭") {
    Vm.total1 = parseInt(Vm.DataTable1.length/Vm.pageSize);
    Vm.n1 = 0;
    if(Vm.n1 === Vm.total1) {
      len = Vm.DataTable1.length%Vm.pageSize;
    }
    else {len = Vm.pageSize;}
    console.log("第"+Vm.n1+"次"+len);
    Vm.showData1 = [];
    for(var j=0, i=Vm.n1*Vm.pageSize; i<Vm.n1*Vm.pageSize+len; j++, i++) {
      Vm.$set(Vm.showData1, j, Vm.DataTable1[i]);
    }
    console.log("第"+Vm.n1+"次"+Vm.showData1);
  }
  else if(name === "忠门") {
    Vm.total2 = parseInt(Vm.DataTable2.length/Vm.pageSize);
    console.log(Vm.total2);
  }
  else if(name === "东埔") {
    Vm.total3 = parseInt(Vm.DataTable3.length/Vm.pageSize);
    console.log(Vm.total3);
  }
  else if(name === "月塘") {
    Vm.total4 = parseInt(Vm.DataTable4.length/Vm.pageSize);
    console.log(Vm.total4);
  }
}
</script>

<style scoped>
.main {
  min-width: 1301px;
  min-height: 701px;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #ffeecc;
  background-color: #b81d25;
}

.header {
  padding-top: 40px;
}

.return {
  position: absolute;
  top: 44px;
  left: 64px;
  z-index: 99;
  cursor: pointer;
}

.title {
  text-align: center;
  letter-spacing: 2px;
}

.result-div {
  display: flex;
  padding: 0 20px;
  background-color: #b81d25;
}

.ranking-list {
  position: relative;
  flex: 1;
  margin: 30px 8px;
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  text-align: center;
  background: #b81d25;
}

.town-name {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 12px auto;
}

.topthree {
  display: flex;
  margin-bottom: 20px;
}

.fst {
  flex: 1;
  height: 100%;
  margin: 0 10px;
  font-weight: bold;
}

.fst-icon {
  width: 50px;
}

.fst-name {
  line-height: 26px;
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 20px;
  letter-spacing: 1px;
}

.first-name {
  line-height: 26px;
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 20px;
}

.others {
}

/*.list {
  height: 7.1%;
  text-align: left;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}*/

.name {
  margin: 0 20px;
  margin-right: 30px;
}
.block {
  position: absolute;
  top: 50px;
  left: 200px;
  width: 150px;
  font-size: 16px;
  color: #ffeecc;
}
</style>
