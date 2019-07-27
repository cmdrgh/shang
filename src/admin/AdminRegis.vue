<template>
  <div class="main">
    <MyTop></MyTop>
    <MyNav :navid="'3'"></MyNav>
    <div class="container" >
      <div class="signins">
          <p class="totalsignins"><span class="townname">忠门籍</span>签到总人数：{{number}}人</p>
          <div class="townsignins">
            <el-row>
              <el-col :span="6"><div class="grid-content">
                <span class="townname">山亭镇</span>
                <span class="townnum">{{number1}}人</span>
              </div></el-col>
              <el-col :span="6"><div class="grid-content">
                <span class="townname">忠门镇</span>
                <span class="townnum">{{number2}}人</span>
              </div></el-col>
              <el-col :span="6"><div class="grid-content">
                <span class="townname">东埔镇</span>
                <span class="townnum">{{number3}}人</span>
              </div></el-col>
              <el-col :span="6"><div class="grid-content">
                <span class="townname">月塘镇</span>
                <span class="townnum">{{number4}}人</span>
              </div></el-col>
            </el-row>
          </div>
      </div>
      <p class="box-card">开启签到
        <span v-show="starttime!=''" class="demonstration">目前已有一个签到安排，时间为：{{starttime}} - {{endtime}}</span>
      </p>
      <div class="settime-div">
        <p class="tips">请选择签到时间</p>
        <div class="block">
          <el-date-picker
            v-model="registertime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <!-- <p class="demonstration">您选择了{{registertime[0]}} 至 {{registertime[1]}}</p> -->
        </div>
        <el-button type="primary" @click="setTime()">开启签到</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import MyTop from "./top.vue"
import MyNav from "./nav.vue"
export default {
  name: "AdminRegis",
  data() {
    return {
      number: '',
      number1: '',
      number2: '',
      number3: '',
      number4: '',
      registertime: null,
      starttime:'',
      endtime: ''
    };
  },
  components: {
    MyTop,
    MyNav
  },
  created() {
    this.axios({
      url: this.baseUrl + "/sign/count",
      method: "get",
    })
      .then(res => {
        // console.log(res);
        this.number = res.data.data.sum;
        if(res.data.data.townCountMap.山亭==null)this.number1=0;
        else this.number1=res.data.data.townCountMap.山亭.sum;
        if(res.data.data.townCountMap.忠门==null)this.number2=0;
        else this.number2=res.data.data.townCountMap.忠门.sum;
        if(res.data.data.townCountMap.东埔==null)this.number3=0;
        else this.number3=res.data.data.townCountMap.东埔.sum;
        if(res.data.data.townCountMap.月塘==null)this.number4=0;
        else this.number4=res.data.data.townCountMap.月塘.sum;
      })
      .catch(error => {
        console.log(error);
      });
    this.axios({
      url: this.baseUrl + "/sign",
      method: "get",
    })
      .then(res => {
        var time;
        if(res.data.data == null) {

        }
        else {
          time = res.data.data.signBeginTimestamp;
          this.starttime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
          var time = res.data.data.signEndTimestamp;
          this.endtime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
          // console.log(res)
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    setTime: function() {
      // 请求接口 如果发现已经设置过签到时间，则弹窗提示
      if(this.registertime==null){
        this.$message({
          type: "warning",
          message: "时间不能为空！"
        });
        return;
      }
      if(this.starttime!='') {
        this.$confirm('此操作将清空用户之前的签到信息, 是否修改签到时间?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var d0=new Date(this.registertime[0]).getTime()
          var d1=new Date(this.registertime[1]).getTime()
          this.axios({
            url: this.baseUrl + "/sign",
            method: "post",
            data:{
              "signBeginTimestamp": d0/1000,
              "signEndTimestamp": d1/1000
            }
          })
            .then(res => {
              this.axios({
                url: this.baseUrl + "/sign",
                method: "get",
              })
                .then(res => {
                  var time = res.data.data.signBeginTimestamp;
                  this.starttime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
                  var time = res.data.data.signEndTimestamp;
                  this.endtime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
                  console.log(res)
                })
                .catch(error => {
                  console.log(error);
                });
              this.$message({
                type: 'success',
                message: '设置成功!'
              });
            })
            .catch(error => {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
          });
        });
      }else{
        var d0=new Date(this.registertime[0]).getTime()
        var d1=new Date(this.registertime[1]).getTime()
        this.axios({
          url: this.baseUrl + "/sign",
          method: "post",
          data:{
            "signBeginTimestamp": d0/1000,
            "signEndTimestamp": d1/1000
          }
        })
          .then(res => {
            this.axios({
              url: this.baseUrl + "/sign",
              method: "get",
            })
              .then(res => {
                var time = res.data.data.signBeginTimestamp;
                this.starttime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
                var time = res.data.data.signEndTimestamp;
                this.endtime = new Date(time*1000).Format("yyyy-MM-dd hh:mm:ss");
                console.log(res)
              })
              .catch(error => {
                console.log(error);
              });
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};

Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
</script>

<style scoped>
.main {
  min-width: 1301px;
  min-height: 701px;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}

.container {
  min-width: 440px;
  padding: 70px 20px;
  padding-left: 220px;
  padding-bottom: 20px;
  font-size: 14px;
  text-align: left;
  background-color: #f4f4f4;
}

.signins {
  padding: 15px 20px;
  border-radius: 3px;
  background-color: #fff;
}

.totalsignins {
  line-height: 16px;
  padding-left: 10px;
  border-left: 3px solid #409EFF;
  font-weight: bold;
}

.townsignins {
  margin-top: 21px;
  margin-bottom: 10px;
}

.grid-content {
  padding: 2px 0;
  text-align: center;
}

.townname {
  padding-right: 10px;
}

.box-card {
  padding: 11px 20px;
  margin: 15px 0;
  border-radius: 3px;
  font-size: 14px;
  background: #fff;
}

.demonstration {
  margin-left: 10px;
  color: #F56C6C;
}

.settime-div {
  padding: 28px 20px;
  padding-bottom: 30px;
  margin: 15px 0;
  text-align: center;
  border-radius: 3px;
  background: #fff;
}

.tips {
  margin-bottom: 15px;
  color: #909399;
}

.block {
  margin-bottom: 30px;
}
</style>
