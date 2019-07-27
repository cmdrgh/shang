<template>
  <div class="main">
    <header class="head">
      <img class="renovate" src="../assets/renovate.png" @click="renovate">
      通讯录
    </header>
    <div class="search">
      <div class="search-div search-condition">
        <select class="condition" v-model="searchCondition" @change="getSelected">
          <option :value="coupon.id" v-for="coupon in couponList" v-bind:key="coupon.id">{{coupon.name}}</option>
        </select>
      </div>
      <div class="search-div search-input">
        <div class="input-div">
          <input type="text" placeholder="请输入关键字" class="s-input" v-model="searchValue">
        </div>
      </div>
      <div class="search-div search-btn">
        <div class="btn-div">
          <button class="s-btn" @click="searchInfo">搜 索</button>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      加载中...
    </div>
    <div class="loading" v-if="fail">
      未找到相关信息
    </div>
    <div v-if="success">
      <div class="addrlist">
        <p class="tip">* 点击可查看详情</p>
        <ul class="addrlist-ul">
          <li class="table-head">
            <span class="num1">姓名</span>
            <span class="num2">原籍</span>
            <span class="num3">手机号</span>
          </li>
          <li v-for="item in currentAddrlist" v-bind:key="item.userId" @click="toDetail(item.userId)">
            <span class="num1">{{item.userInfoName}}</span>
            <span class="num2">{{item.userInfoTown}} {{item.userInfoVillage}}</span>
            <span class="num3">{{item.userInfoPhone}}</span>
          </li>
        </ul>
        <div class="page">
          <div class="pagepart pageleft">
            <img class="prev page-icon" src="../assets/square.png" @click="prev">
            <span>{{curPageNum}}</span>/<span>{{maxPageNum}}</span>
            <img class="next page-icon" src="../assets/square.png" @click="next">
          </div>
          <div class="pagepart pageright">
            <div class="pagenum-div">
              <input type="number" class="pagenum" v-model="gotoPageNum">
            </div>
            <button class="gotobtn" @click="gotoPage">跳 转</button>
          </div>
        </div>
      </div>
    </div>
    <Navigation :tagid="1"></Navigation>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'AddrList',
  data () {
    return {
      searchConditon: '',
      keyword: '',
      maxPageNum: 1,
      curPageNum: 1,
      pageSize: 12,
      gotoPageNum: '',
      currentAddrlist: [],

      couponList:[
        {
          id: '0',
          name: '选择条件'
        },
        {
          id: '1',
          name: '姓名'
        },
        {
          id: '2',
          name: '镇'
        },
        {
          id: '3',
          name: '村'
        },
        {
          id: '4',
          name: '职业'
        },
        {
          id: '5',
          name: '单位'
        }
      ],
      searchCondition: '',
      searchValue: '',

      name: '',
      town: '',
      village: '',
      occupation: '',
      team: '',

      loading: false,
      success: true,
      fail: false
    }
  },
  components: {
    Navigation
  },
  created() {
    var _this = this;
    this.curPageNum = this.$route.params.pageNum;  // 设置进入的页码，如果页码为空则赋值为1
    if(!this.curPageNum) {
      this.curPageNum = 1;
    }

    this.searchValue = '';
    this.name = '';
    this.town = '';
    this.village = '';
    this.occupation = '';
    this.team = '';

    if(this.$route.params.search_conditionid === '0' || this.$route.params.search_conditionid === undefined) {
      this.searchCondition = this.couponList[0].id;  //设置select的默认值
    }
    else if(this.$route.params.search_conditionid === '1') {
      this.searchCondition = this.couponList[1].id;
      this.name = this.$route.params.search_conditionval;
    }
    else if(this.$route.params.search_conditionid === '2') {
      this.searchCondition = this.couponList[2].id;
      this.town = this.$route.params.search_conditionval;
    }
    else if(this.$route.params.search_conditionid === '3') {
      this.searchCondition = this.couponList[3].id;
      this.village = this.$route.params.search_conditionval;
    }
    else if(this.$route.params.search_conditionid === '4') {
      this.searchCondition = this.couponList[4].id;
      this.occupation = this.$route.params.search_conditionval;
    }
    else if(this.$route.params.search_conditionid === '5') {
      this.searchCondition = this.couponList[5].id;
      this.team = this.$route.params.search_conditionval;
    }

    this.searchValue = this.$route.params.search_conditionval;

    this.axios({
      url: this.baseUrl + '/user/info/search',
      method: 'post',
      data: {
        "pageNum": this.curPageNum,
        "pageSize": this.pageSize,
        "userInfoName": this.name,
        "userInfoOccupation": this.occupation,
        "userInfoTown": this.town,
        "userInfoUnit": this.team,
        "userInfoVillage": this.village
      }
    })
    .then(function(res) {
      // console.log(res);
      _this.maxPageNum = res.data.data.maxPageNum;
      _this.currentAddrlist = res.data.data.userInfoVOList;
    })
    .catch(function(error) {
      console.log(error);
    })
  },
  watch: {
    searchCondition(val) {
      this.name = '';
      this.town = '';
      this.village = '';
      this.occupation = '';
      this.team = '';
    }
  },
  methods: {
    prev: function() {
      var _this = this;

        if(this.curPageNum === 1) {
          this.$toast('没有上一页了');
        }
        else {
          this.curPageNum = this.curPageNum-1;
          this.currentAddrlist = [];
          this.loading = true;
          this.success = false;

            this.axios({
              url: this.baseUrl + '/user/info/search',
              method: 'post',
              data: {
                "pageNum": this.curPageNum,
                "pageSize": this.pageSize,
                "userInfoName": this.name,
                "userInfoOccupation": this.occupation,
                "userInfoTown": this.town,
                "userInfoUnit": this.team,
                "userInfoVillage": this.village
              }
            })
            .then(function(res) {
              // console.log(res);
              _this.currentAddrlist = res.data.data.userInfoVOList;
              _this.success = true;
              _this.loading = false;
            })
            .catch(function(error) {
              console.log(error);
            })
      }
    },
    next: function() {
      var _this = this;

        if(this.curPageNum === this.maxPageNum) {
          this.$toast('没有下一页了');
        }
        else {
          this.curPageNum = this.curPageNum+1;
          this.currentAddrlist = [];
          this.loading = true;
          this.success = false;

            this.axios({
              url: this.baseUrl + '/user/info/search',
              method: 'post',
              data: {
                "pageNum": this.curPageNum,
                "pageSize": this.pageSize,
                "userInfoName": this.name,
                "userInfoOccupation": this.occupation,
                "userInfoTown": this.town,
                "userInfoUnit": this.team,
                "userInfoVillage": this.village
              }
            })
            .then(function(res) {
              // console.log(res);
              _this.currentAddrlist = res.data.data.userInfoVOList;
              _this.loading = false;
              _this.success = true;
            })
            .catch(function(error) {
              console.log(error);
            })
        }
    },
    gotoPage: function() {
      var _this = this;

        if(0 < this.gotoPageNum && this.gotoPageNum <= this.maxPageNum) {
          this.loading = true;
          this.success = false;

            this.axios({
              url: this.baseUrl + '/user/info/search',
              method: 'post',
              data: {
                "pageNum": this.gotoPageNum,
                "pageSize": this.pageSize,
                "userInfoName": this.name,
                "userInfoOccupation": this.occupation,
                "userInfoTown": this.town,
                "userInfoUnit": this.team,
                "userInfoVillage": this.village
              }
            })
            .then(function(res) {
              // console.log(res);
              _this.curPageNum = _this.gotoPageNum
              _this.currentAddrlist = res.data.data.userInfoVOList;
              _this.gotoPageNum = '';
              _this.loading = false;
              _this.success = true;
            })
            .catch(function(error) {
              console.log(error);
            })
        }
        else {
          this.$toast('页码错误');
        }
    },
    getSelected: function() {
      // console.log(this.searchCondition)
    },
    searchInfo: function() {
      var _this = this;

        if(this.searchCondition == 1) {
          this.name = this.searchValue;
        }
        else if(this.searchCondition == 2) {
          this.town = this.searchValue;
        }
        else if(this.searchCondition == 3) {
          this.village = this.searchValue;
        }
        else if(this.searchCondition == 4) {
          this.occupation = this.searchValue;
        }
        else if(this.searchCondition == 5) {
          this.team = this.searchValue;
        }

        this.curPageNum = 1;
        this.loading = true;
        this.success = false;
        this.fail = false;
        this.axios({
          url: this.baseUrl + '/user/info/search',
          method: 'post',
          data: {
            "pageNum": this.curPageNum,
            "pageSize": this.pageSize,
            "userInfoName": this.name,
            "userInfoOccupation": this.occupation,
            "userInfoTown": this.town,
            "userInfoUnit": this.team,
            "userInfoVillage": this.village
          }
        })
        .then(function(res) {
          // console.log(res);
          _this.gotoPageNum = '';
          _this.loading = false;

          if(res.data.data.maxPageNum == 0) {
            _this.fail = true;
          }
          else {
            _this.success = true;
            _this.maxPageNum = res.data.data.maxPageNum;
            _this.currentAddrlist = res.data.data.userInfoVOList;
          }
        })
        .catch(function(error) {
          console.log(error);
        })

    },
    renovate: function() {
      var _this = this;

        this.searchCondition = '0';
        this.searchValue = '';
        this.name = '';
        this.town = '';
        this.village = '';
        this.occupation = '';
        this.team = '';
        this.loading = true;
        this.success = false;
        this.fail = false;

        this.axios({
          url: this.baseUrl + '/user/info/search',
          method: 'post',
          data: {
            "pageNum": 1,
            "pageSize": this.pageSize,
            "userInfoName": "",
            "userInfoOccupation": "",
            "userInfoTown": "",
            "userInfoUnit": "",
            "userInfoVillage": ""
          }
        })
        .then(function(res) {
          // console.log(res);
          _this.maxPageNum = res.data.data.maxPageNum;
          _this.curPageNum = 1;
          _this.currentAddrlist = res.data.data.userInfoVOList;
          _this.loading = false;
          _this.success = true;
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    toDetail: function(id) {
      var _this = this;
      this.$router.push({
        name: "Detail",
        params: {
          userId: id,
          curPage: _this.curPageNum,
          search_conditionid: _this.searchCondition,
          search_conditionval: _this.searchValue
        }
      });
    }
  }
}

function getInfo() {

}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 0.52rem;
  background: #fff;
}

.head {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0.28rem 0;
  color: #f39839;
  background-color: #fff;
  z-index: 99;
}

.renovate {
  position: fixed;
  top: 0.4rem;
  right: 0.4rem;
  width: 0.52rem;
}

.search {
  position: fixed;
  top: 1.26rem;
  box-sizing: border-box;
  width: 100%;
  height: 1.42rem;
  padding: 0.24rem 0.1rem;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
  z-index: 99;
}

.search-div {
  box-sizing: border-box;
  float: left;
  height: 0.88rem;
}

.search-condition {
  width: 30%;
  padding-right: 0.12rem;
  background: transparent;
}

.condition {
  width: 97%;
  line-height: 0.88rem;
  padding-left: 0.06rem;
  font-size: 0.52rem;
  color: #606266;
  border: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background: url("../assets/arrow.png") no-repeat scroll right center transparent;
}

.search-input {
  width: 50%;
  padding: 0 0.12rem;
  border-left: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
}

.input-div {
  width: 100%;
  line-height: 0.88rem;
  border-radius: 0.1rem;
  background: #f4f4f4;
}

.s-input {
  width: 92.8%;
  line-height: 0.86rem;
  padding: 0 0.14rem;
  border: none;
  font-size: 0.52rem;
  border-radius: 0.1rem;
  background-color: transparent;
}

::-webkit-input-placeholder { /* WebKit browsers */
  color: #909399;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #909399;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #909399;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #909399;
}

.search-btn {
  width: 20%;
  padding-left: 0.124rem;
  padding-right: 0.06rem;
}

.btn-div {
  width: 100%;
  border-radius: 0.1rem;
  background: #b74620;
}

.s-btn {
  width: 100%;
  line-height: 0.88rem;
  border: none;
  font-size: 0.5rem;
  color: #fff;
  background: transparent;
}

.addrlist {
  padding: 2.9rem 0.22rem;
  padding-right: 0.25rem;
  padding-bottom: 2.94rem;
  font-size: 0.55rem;
  color: #303133;
}

.table-head {
  font-weight: 600;
}

.addrlist-ul {
  width: 100%;
  float: left;
  margin-bottom: 0.6rem;
  text-align: center;
  border: 1px solid #909399;
  border-bottom: none;
}

.addrlist-ul>li {
  float: left;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #909399;
  list-style: none;
  font-weight: bold;
}

.addrlist-ul>li span {
  box-sizing: border-box;
  float: left;
  padding: 0.16rem 0;
}

.num1 {
  width: 25%;
  line-height: 0.74rem;
}
.num2 {
  width: 37%;
  line-height: 0.74rem;
  border-left: 1px solid #909399;
  border-right: 1px solid #909399;
}
.num3 {
  width: 38%;
  line-height: 0.74rem;
}

.page {
  clear: both;
  margin-top: 1rem;
  font-size: 0.56rem;
  background: #b746205e;
}

.pagepart {
  box-sizing: border-box;
  float: left;
  width: 45%;
}

.pageleft {
  padding-right: 0.3rem;
  text-align: right;
}

.pageright {
  text-align: left;
}

.page-icon {
  width: 0.45rem;
  margin-bottom: -0.03rem;

}
.prev {
  transform:rotate(-90deg);
  -ms-transform:rotate(-90deg); 	/* IE 9 */
  -moz-transform:rotate(-90deg); 	/* Firefox */
  -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
  -o-transform:rotate(-90deg); 	/* Opera */
}
.next {
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 	/* Opera */
}

.pagenum-div {
  float: left;
  width: 1.26rem;
  line-height: 0.72rem;
  margin-top: -0.08rem;
  margin-right: 0.4rem;
  border: 1px solid #909399;
  border-radius: 0.08rem;
  background: transparent;
}

.pagenum {
  width: 1.10rem;
  line-height: 0.72rem;
  padding: 0.02rem 0.08rem;
  font-size: 0.56rem;
  border: none;
  background-color: transparent;
}

.gotobtn {
  float: left;
  width: 1.66rem;
  line-height: 0.8rem;
  margin-top: -0.08rem;
  border: none;
  border-radius: 0.08rem;
  font-size: 0.52rem;
  color: #fff;
  background-color: #b74620;
}

.loading {
  position: relative;
  top: 3.6rem;
  font-size: 0.56rem;
  color: #909399;
}

.tip {
  margin-bottom: 0.28rem;
  text-align: left;
  font-size: 0.46rem;
  color: #b74620;
}
</style>
