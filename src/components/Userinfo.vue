<template>
  <div class="main">
    <header class="head">
      个人主页
      <span class="logoff" @click="logoff">退出</span>
    </header>
    <div class="info-table">
      <form class="info-form">
        <div class="form-div">
          <img class="icon" src="../assets/user.png">
          <span class="necessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info" v-show="noedit">{{username}}</span>
            <input v-model="username" v-show="edit" class="info-input usrname-input" placeholder="姓名">
          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/phone.png">
          <span class="necessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info" v-show="noedit">{{cellphone}}</span>
            <input v-model="cellphone" v-show="edit" class="info-input" type="tel" maxlength="11" placeholder="手机号">
          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/QQ.png">
          <span class="unnecessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info info-null" v-show="noeditQQ">QQ</span>
            <span class="info" v-show="noedit">{{qqnumber}}</span>
            <input v-model="qqnumber" v-show="edit" class="info-input" placeholder="QQ">
          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/wx.png">
          <span class="unnecessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info info-null" v-show="noeditwx">微信</span>
            <span class="info" v-show="noedit">{{wechat}}</span>
            <input v-model="wechat" v-show="edit" class="info-input" placeholder="微信">
          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/occupation.png">
          <span class="necessary" v-show="edit">*</span>
          <div class="input-div spacial">
            职业：<span class="info" v-show="noedit">{{occupation}}</span>

            <select class="select occupation" v-model="occupation" v-show="edit">
              <option :value="item.name" v-for="item in occupationlist" v-bind:key="item.id">{{item.name}}</option>
              <!-- <option value="occupation1">公务员</option>
              <option value="occupation2">事业单位</option>
              <option value="occupation3">企业或自由职业</option>
              <option value="occupation4">无业或退休</option> -->
            </select>

          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/location.png">
          <span class="necessary" v-show="edit">*</span>
          <div class="input-div spacial">
            原籍：<span class="info" v-show="noedit">{{town}}</span>
            <select class="select town" v-model="townid" v-show="edit">
              <option value="st">山亭</option>
              <option value="zm">忠门</option>
              <option value="dp">东埔</option>
              <option value="yt">月塘</option>
            </select>
            <span v-show="noedit">镇</span>
            <span class="info" v-show="noedit">{{village}} 村</span>

            <select class="select village" v-model="village" v-show="edit">
              <option v-for="(item, index) in items" v-bind:key="index" :value="item">{{item}}</option>
            </select>

          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/team.png">
          <span class="unnecessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info info-null" v-show="noeditteam">工作单位</span>
            <span class="info" v-show="noedit">{{team}}</span>
            <input v-model="team" v-show="edit" class="info-input" placeholder="工作单位">
          </div>
        </div>
        <div class="form-div">
          <img class="icon" src="../assets/address.png">
          <span class="unnecessary" v-show="edit">*</span>
          <div class="input-div">
            <span class="info info-null" v-show="noeditaddress">地址</span>
            <span class="info" v-show="noedit">{{address}}</span>
            <input v-model="address" v-show="edit" class="info-input" placeholder="地址">
          </div>
        </div>
      </form>
      <button v-show="edit" class="save-btn" @click="save">保 存</button>
      <button v-show="noedit" class="save-btn" @click="editinfo">修 改</button>
      <p v-show="edit" class="tip">* 为必填</p>
    </div>
    <!-- <button @click="text">测试</button> -->
    <Navigation v-show="noedit" :tagid="4"></Navigation>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'Userinfo',
  data () {
    return {
      flag: 1,
      noedit: false,
      edit: true,
      noeditQQ: false,
      noeditwx: false,
      noeditteam: false,
      noeditaddress: false,
      username: '',
      cellphone: '',
      qqnumber: '',
      wechat: '',
      occupation: '',
      townid: '',
      town: '',
      village: '',
      team: '',
      address: '',
      occupationlist: [
        {
          id: 1,
          name: '公务员'
        },
        {
          id: 2,
          name: '事业单位'
        },
        {
          id: 3,
          name: '企业或自由职业'
        },
        {
          id: 4,
          name: '无业或退休'
        }
      ],
      items: [],
      item0: ['西乌垞','东乌垞','新乌垞','山柄','东店','西埔','西埔口','山亭','蒋山','利山','港里','西前','莆禧','东仙','文甲'],
      item1: ['后坑','安柄','柳厝','沁头','秀华','秀田','秀前','琼山','忠门','王厝'],
      item2: ['何山','东坑','前范','度口','东埔','下坑','塔林','乐屿','西山','度下','梯亭','吉成','东吴'],
      item3: ['东潘','洋埭','砺山','岱(蚮)前','前康','西园','双告山','月埔','霞塘','坂尾','联星']
    }
  },
  components: {
    Navigation
  },
  created() {
    var param = this.$route.query.edit;  // 从父组件接受的参数
    var _this = this;
    if(param == 0) {
      this.noedit = true
      this.edit = false;

      this.axios({
        url: this.baseUrl + '/user/info',
        method: 'get'
      })
      .then(function(res) {
        // console.log(res);
        _this.flag = 0;

        _this.username = res.data.data.userInfoName;
        _this.cellphone = res.data.data.userInfoPhone;
        _this.qqnumber = res.data.data.userInfoQQ;
        _this.wechat = res.data.data.userInfoWechat;
        _this.occupation = res.data.data.userInfoOccupation;
        _this.town = res.data.data.userInfoTown;
        _this.village = res.data.data.userInfoVillage;
        _this.team = res.data.data.userInfoUnit;
        _this.address = res.data.data.userInfoAddress;

        if(_this.qqnumber === '') {
          _this.noeditQQ = true;
        }
        if(_this.wechat === '') {
          _this.noeditwx = true;
        }
        if(_this.team === '') {
          _this.noeditteam = true;
        }
        if(_this.address === '') {
          _this.noeditaddress = true;
        }

        if(_this.town == '山亭') {
          _this.townid = 'st';
          _this.items = _this.item0;
        }
        else if(_this.town == '忠门') {
          _this.townid = 'zm';
          _this.items = _this.item1;
        }
        else if(_this.town == '东埔') {
          _this.townid = 'dp';
          _this.items = _this.item2;
        }
        else if(_this.town == '月塘') {
          _this.townid = 'yt';
          _this.items = _this.item3;
        }

      })
      .catch(function(error) {
        console.log(error);
      })
    }
  },
  watch: {
    cellphone(val) {
      var re = /^1[0-9]*$/;
      if(re.test(val)) {

      }
      else {
        this.$toast('手机号错误');
      }
    },
    townid(val) {
      // console.log(val);
      if(val == 'st') {
        this.town = '山亭';
        this.items = this.item0;
        if(this.village === '' || this.flag === 1) {
          this.village = this.items[0];
        }
      }
      else if(val == 'zm') {
        this.town = '忠门';
        this.items = this.item1;
        if(this.village === '' || this.flag === 1) {
          this.village = this.items[0];
        }
      }
      else if(val == 'dp') {
        this.town = '东埔';
        this.items = this.item2;
        if(this.village === '' || this.flag === 1) {
          this.village = this.items[0];
        }
      }
      else if(val == 'yt') {
        this.town = '月塘';
        this.items = this.item3;
        if(this.village === '' || this.flag === 1) {
          this.village = this.items[0];
        }
      }
    }
  },

  methods: {
    save: function() {
      var _this = this;
      var re = /^1[0-9]*$/;
      if(this.username == '') {
        this.$toast('姓名不能为空');
      }
      else if(this.cellphone == '') {
        this.$toast('手机号不能为空');
      }
      else if(this.cellphone.length < 11 || !re.test(this.cellphone)) {
        this.$toast('手机号错误');
      }
      else if(this.occupation == '') {
        this.$toast(' 职业不能为空');
      }
      else if(this.town == '') {
        this.$toast(' 镇不能为空');
      }
      else {
        if(this.village == '' || !(this.village)) {
          this.$toast(' 村不能为空');
        }
        else {
          this.axios({
            url: this.baseUrl + '/user/info',
            method: 'post',
            data: {
              "userInfoAddress": this.address,
              "userInfoName": this.username,
              "userInfoOccupation": this.occupation,
              "userInfoPhone": this.cellphone,
              "userInfoQQ": this.qqnumber,
              "userInfoTown": this.town,
              "userInfoUnit": this.team,
              "userInfoVillage": this.village,
              "userInfoWechat": this.wechat
            }
          })
          .then(function(res) {
            // console.log(res);
            _this.$toast('保存成功');
            _this.noedit = !_this.noedit;
            _this.edit = !_this.edit;
            if(_this.qqnumber === '') {
              _this.noeditQQ = true;
            }
            if(_this.wechat === '') {
              _this.noeditwx = true;
            }
            if(_this.team === '') {
              _this.noeditteam = true;
            }
            if(_this.address === '') {
              _this.noeditaddress = true;
            }
          })
          .catch(function(error) {
            // console.log(error);
          })
        }
      }
    },
    editinfo: function() {
      this.flag = 1;
      this.noedit = !this.noedit;
      this.edit = !this.edit;
      this.noeditQQ = false;
      this.noeditwx = false;
      this.noeditteam = false;
      this.noeditaddress = false;
    },
    logoff: function() {
      this.$cookies.remove('token');
      this.$cookies.remove('token2');
      this.$cookies.remove('signCheck');
      this.$cookies.remove('infoCheck');
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 0.52rem;
  background-color: #fff;
}

.head {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0.28rem 0;
  border-bottom: 1px solid #ebebeb;
  color: #f39839;
  background-color: #fff;
  z-index: 99;
}

.info-table {
  padding: 1.9rem 0.62rem;
  padding-bottom: 2.5rem;
  background-color: #fff;
  font-size: 0.58rem;
}

.info-form {
  text-align: left;
}

.form-div {
  position: relative;
  line-height: 0.9rem;
  margin-bottom: 0.6rem;
}

.icon {
  width: 0.9rem;
  margin-bottom: -0.3rem;
}

.necessary {
  font-weight: bolder;
  color: #b74620;
}

.unnecessary {
  font-weight: bolder;
  color: transparent;
}

.input-div {
  position: absolute;
  top: 0;
  left: 1.4rem;
  width: 82%;
  height: 0.98rem;
  line-height: 0.98rem;
  color: #303133;
  border-bottom: 0.01rem solid #ebebeb;
}

.spacial {
  width: 80%;
  padding: 0.08rem 0.14rem;
  padding-top: 0;
}

.info-input {
  width: 96%;
  padding: 0.14rem;
  border: none;
  font-size: 0.58rem;
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

.select {
  width: 4.74rem;
  margin-left: -0.02rem;
  font-size: 0.58rem;
  color: #303133;
  border: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background: url("../assets/arrow.png") no-repeat scroll right center transparent;
}

.town {
  width: 1.6rem;
}

.village {
  width: 2.6rem;
  margin-left: 0.4rem;
}

.save-btn {
  width: 32%;
  padding: 0.16rem 0;
  margin: 0.26rem auto;
  margin-bottom: 0.4rem;
  border: none;
  border-radius: 0.16rem;
  font-size: 0.58rem;
  color: #fff;
  background-color: #b74620;
}

.info {
  display: inline-block;
  margin-left: 0.14rem;
}

.info-null {
  color: #909399;
}

.usrname-input {
  position: absolute;
  top: -0.02rem;
}

.tip {
  font-size: 0.42rem;
  color: #b74620;
}

.logoff {
  position: fixed;
  top: 0.34rem;
  right: 0.4rem;
  font-size: 0.46rem;
  color: #909399;
}
</style>
