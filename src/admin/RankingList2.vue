<template>
  <div class="ranking-list">
    <p class="town-name">{{townname}}镇 &nbsp;&nbsp;{{n+1}}/{{total+1}}</p>
    <div class="others">
      <p class="others-list" v-for="(item, index) in showData" v-bind:key="index">
        <span class="name">{{item.userInfoName}}</span>
        <span class="num">{{item.donationNumber}} 元</span>
      </p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "AdminRanking",
  data() {
    return {
      pageSize: 28,
      timer: '',
      fst: [{userInfoName: '暂无', donationNumber: 0}, {userInfoName: '暂无', donationNumber: 0}, {userInfoName: '暂无', donationNumber: 0}],
      showData: [],
      DataTable: [],
      n: 0,
      total: 0
    };
  },
  props: {
    townname: String,
    minNum: String
  },
  created() {
    this.axios({
      url: this.baseUrl + '/donation/rank?minNumber=' + this.minNum,
      method: 'get'
    })
    .then((res) => {
      // console.log(res);

      initail(this, res.data.data, this.townname);

      initailData(this, this.townname);
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods: {
    getInfo() {
      var _this = this;
      this.n ++;
      // console.log(this.n);
      // console.log(this.total);
      if(this.n > this.total) {
        console.log('正在更新');
        this.n = 0;
        $.ajax({
          url: this.baseUrl + '/donation/rank?minNumber=' + this.minNum,
          method: 'get',
          headers: {
            'S-TOKEN': this.$cookies.get('token2')
          },
          async: false,
          dataType: "json",
          success: function(res) {
            // console.log(res);
            initail(_this, res.data, _this.townname);
          },
          error: function(err) {
            console.log(err);
          }
        })
      }
      var len;
      // console.log(this.n);
      if(this.n === this.total && this.DataTable.length%this.pageSize !== 0) {
        len = this.DataTable.length%this.pageSize;
      }
      else {
        len = this.pageSize;
      }
      // console.log("第"+this.n+"次"+len);
      if(this.DataTable.length !== 0) {
        this.showData = [];
        for(var j=0, i=this.n*this.pageSize; i<this.n*this.pageSize+len; j++, i++) {
          this.$set(this.showData, j, this.DataTable[i]);
        }
      }
      // console.log("第"+this.n+"次"+this.showData);
    }
  },
  mounted() {
    this.timer = setInterval(this.getInfo,9000);
  },
  beforeDestroy() { //清除定时器
    clearInterval(this.timer);
    // console.log("beforeDestroy");
  },
  destroyed() { //清除定时器
    //clearInterval(this.timer);
    // console.log("destroyed");
  }

};

function initail(Vm, res, name) {

  var lens = count(res.donationRankMap[name]);

  for(var i=0; i<lens; i++) {
    Vm.$set(Vm.DataTable, i, res.donationRankMap[name][i]);
  }
  if(Vm.DataTable.length%Vm.pageSize === 0) {
    Vm.total = parseInt(Vm.DataTable.length/Vm.pageSize)-1;
  }
  else {
    Vm.total = parseInt(Vm.DataTable.length/Vm.pageSize);
  }
  // console.log('每次更新的个数'+Vm.total);
  Vm.n = 0;
}

function initailData(Vm, name) {
  var len=0;

  if(Vm.n === Vm.total && Vm.DataTable.length%Vm.pageSize !== 0) {
    len = Vm.DataTable.length%Vm.pageSize;
  }
  else {len = Vm.pageSize;}
  // console.log("第"+Vm.n+"次"+len);
  console.log(Vm.DataTable.length);
  if(Vm.DataTable.length !== 0) {
    Vm.showData = [];
    for(var j=0, i=Vm.n*Vm.pageSize; i<Vm.n*Vm.pageSize+len; j++, i++) {
      Vm.$set(Vm.showData, j, Vm.DataTable[i]);
    }
  }

  // console.log("第"+Vm.n+"次"+Vm.showData);
}

function count(o){
  var t = typeof o;

  if(t == 'string'){
    return o.length;
  }
  else if(t == 'object'){
    var n = 0;
    for(var i in o){
      n++;
    }
    return n;
  }
  return false;
}
</script>

<style scoped>
.ranking-list {
  position: relative;
  flex: 1;
  min-width: 520px;
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
  margin: 15px auto;
}

.others {
  position:absolute;
  top: 60px;
  bottom: 10px;
  left: 20px;
  right: 20px;
}

.others-list {
  float: left;
  box-sizing: border-box;
  width: 50%;
  height: 7%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}

.name {
  display: inline-block;
  width: 90px;
}
</style>
