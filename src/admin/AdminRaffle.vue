<template>
  <div class="main">
    <MyTop></MyTop>
    <MyNav :navid="'4-1'"></MyNav>
    <div class="container">
      <div class="prize-setting">
        <p class="box-card1">奖品设定</p>
        <el-row>
          <el-col :span="5"><div class="grid-content">
            <p class="prizesetting">
              特等奖：
              <el-input
                placeholder="个数"
                v-model="specialaward"
                clearable
                style="width: 72px;"
                size="mini">
              </el-input>
            </p>
          </div></el-col>
          <el-col :span="5"><div class="grid-content">
            <p class="prizesetting">
              一等奖：
              <el-input
                placeholder="个数"
                v-model="firstprize"
                clearable
                style="width: 72px;"
                size="mini">
              </el-input>
            </p>
          </div></el-col>
          <el-col :span="5"><div class="grid-content">
            <p class="prizesetting">
              二等奖：
              <el-input
                placeholder="个数"
                v-model="secondprize"
                clearable
                style="width: 72px;"
                size="mini">
              </el-input>
            </p>
          </div></el-col>
          <el-col :span="5"><div class="grid-content">
            <p class="prizesetting">
              三等奖：
              <el-input
                placeholder="个数"
                v-model="thirdprize"
                clearable
                style="width: 72px;"
                size="mini">
              </el-input>
            </p>
          </div></el-col>
            <el-col :span="4" style="text-align:right;">
              <el-button size="small" type="primary" @click="prizesetting">提交</el-button>
              <el-button size="small" @click="prizereset">重置</el-button>
            </el-col>
        </el-row>
      </div>
      <p class="box-card">
        <span class="tip">抽奖码列表</span>
        <el-button @click="prizeadduser()" size="mini" type="primary">添加</el-button>
      </p>
      <el-table :data="tableData" stripe height="377">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="userInfoName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
        <el-table-column align="center" prop="lotteryCode" label="抽奖码"></el-table-column>
        <el-table-column align="center" prop="lotteryResult2" label="抽奖结果"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalnum"
          background>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MyTop from "./top.vue"
import MyNav from "./nav.vue"

export default {
  name: "AdminRaffle",
  data() {
    return {
      currentPage: 1,
      totalnum: 9,
      pageSize: 7,
      specialaward: '',
      firstprize: '',
      secondprize: '',
      thirdprize: '',
      tableData: [
        {
          number: "1",
          name: "王小虎",
          username: "忠门镇忠门村",
          raffle_code: "1234567890",
          raffle_result: "特等奖"
        },
        {
          number: "2",
          name: "王小虎",
          username: "忠门镇忠门村",
          raffle_code: "1234567890",
          raffle_result: "特等奖"
        }
      ],
    };
  },
  components: {
    MyTop,
    MyNav
  },
  created(){
    this.axios({
      url: this.baseUrl + "/lottery/all",
      method: "post",
      data: {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
    })
    .then(res => {
      // console.log(res.data);
      this.tableData = res.data.data.lotteryVOList;
      var l=this.tableData.length
      for(var i=0;i<l;i++){
        if(this.tableData[i]['lotteryResult']==null)this.tableData[i]['lotteryResult2']="未抽奖"
        if(this.tableData[i]['lotteryResult']=="nothing")this.tableData[i]['lotteryResult2']="未中奖"
        if(this.tableData[i]['lotteryResult']=="special")this.tableData[i]['lotteryResult2']="特等奖"
        if(this.tableData[i]['lotteryResult']=="first")this.tableData[i]['lotteryResult2']="一等奖"
        if(this.tableData[i]['lotteryResult']=="second")this.tableData[i]['lotteryResult2']="二等奖"
        if(this.tableData[i]['lotteryResult']=="third")this.tableData[i]['lotteryResult2']="三等奖"
      }

      // console.log("b",this.tableData)
      this.totalnum = res.data.data.maxPageNum * this.pageSize;
    })
    .catch(error => {
      console.log(error);
    });

    this.axios({
      url: this.baseUrl + "/lottery/prize",
      method: "get",
    })
    .then(res => {
      this.specialaward=res.data.data.lotterySpecial
      this.firstprize=res.data.data.lotteryFirst
      this.secondprize=res.data.data.lotterySecond
      this.thirdprize=res.data.data.lotteryThird
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    prizesetting: function() {
      if(this.firstprize==''||this.secondprize==''||this.thirdprize==''||this.specialaward==''){
        this.$message({
          type: "warning",
          message: "请输入奖品个数"
        });
        return;
      }
      var _this=this
      this.$confirm("是否设置奖品数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.axios({
          url: this.baseUrl + "/lottery/prize",
          method: "post",
          data:{
            "lotteryFirst": this.firstprize,
            "lotterySecond": this.secondprize,
            "lotterySpecial": this.specialaward,
            "lotteryThird": this.thirdprize
          }
        })
        .then(function(res) {

          _this.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消设置"
        });
      });
    },
    prizereset: function() {
      this.specialaward="";
      this.firstprize="";
      this.secondprize="";
      this.thirdprize="";
    },
    prizeadduser: function() {
      this.$prompt("请输入您的姓名", "添加抽奖码", {
        inputPlaceholder: '姓名',
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
      .then(({ value }) => {
        // value值就是input的value
        this.axios({
          url: this.baseUrl + "/lottery/special?name="+ value,
          method: "get",
        })
        .then(res => {
          this.axios({
            url: this.baseUrl + "/lottery/all",
            method: "post",
            data: {
              pageNum: this.currentPage,
              pageSize: this.pageSize
            }
          })
          .then(res => {
            // console.log(res.data);
            this.tableData = res.data.data.lotteryVOList;
            var l=this.tableData.length
            for(var i=0;i<l;i++){
              if(this.tableData[i]['lotteryResult']==null)this.tableData[i]['lotteryResult2']="未抽奖"
              if(this.tableData[i]['lotteryResult']=="nothing")this.tableData[i]['lotteryResult2']="未中奖"
              if(this.tableData[i]['lotteryResult']=="special")this.tableData[i]['lotteryResult2']="特等奖"
              if(this.tableData[i]['lotteryResult']=="first")this.tableData[i]['lotteryResult2']="一等奖"
              if(this.tableData[i]['lotteryResult']=="second")this.tableData[i]['lotteryResult2']="二等奖"
              if(this.tableData[i]['lotteryResult']=="third")this.tableData[i]['lotteryResult2']="三等奖"
            }
            // console.log(this.tableData)
            this.totalnum = res.data.data.maxPageNum * this.pageSize;
          })
          .catch(error => {
            console.log(error);
          });

          // console.log(res.data);
          this.$alert('您成功为用户 ['+value+'] 添加了抽奖码：'+res.data.data, '添加成功', {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消输入"
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.axios({
        url: this.baseUrl + "/lottery/all",
        method: "post",
        data: {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then(res => {
          // console.log(res.data);
          this.tableData = res.data.data.lotteryVOList;
          var l=this.tableData.length
          for(var i=0;i<l;i++){
            if(this.tableData[i]['lotteryResult']==null)this.tableData[i]['lotteryResult2']="未抽奖"
            if(this.tableData[i]['lotteryResult']=="nothing")this.tableData[i]['lotteryResult2']="未中奖"
            if(this.tableData[i]['lotteryResult']=="special")this.tableData[i]['lotteryResult2']="特等奖"
            if(this.tableData[i]['lotteryResult']=="first")this.tableData[i]['lotteryResult2']="一等奖"
            if(this.tableData[i]['lotteryResult']=="second")this.tableData[i]['lotteryResult2']="二等奖"
            if(this.tableData[i]['lotteryResult']=="third")this.tableData[i]['lotteryResult2']="三等奖"
          }
          console.log(this.tableData)
          this.totalnum = res.data.data.maxPageNum * this.pageSize;
        })
        .catch(error => {
          console.log(error);
        });
    },
    indexMethod(index) {
      return (this.currentPage-1)*this.pageSize + index + 1;
    },
  }
};
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
  padding: 70px 20px;
  padding-left: 220px;
  padding-bottom: 20px;
  text-align: left;
  font-size: 14px;
  background-color: #f4f4f4;
}

.box-card {
  padding: 7px 20px;
  margin: 15px 0;
  border-radius: 3px;
  font-size: 14px;
  text-align: right;
  background: #fff;
}

.tip {
  float: left;
  line-height: 28px;
}

.box-card1 {
  margin-bottom: 15px;
  line-height: 16px;
  padding-left: 10px;
  border-left: 3px solid #409EFF;
  font-weight: bold;
}

.prize-setting {
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 3px;
  font-size: 14px;
  background-color: #fff;
}

.grid-content {
  background-color: transparent;
}

.prizesetting {
  /* text-align: center; */
  line-height: 36px;
}

.p-head {
  font-weight: bold;
  color: #909399;
  border-bottom: 1px solid #EBEEF5;
}

.block {
  margin: 20px auto;
  text-align: center;
}
</style>
