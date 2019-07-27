<template>
  <div class="main">
    <MyTop></MyTop>
    <MyNav :navid="'2'"></MyNav>
    <div class="container">
      <div class="container-left">
        <div class="search-div">
          <!--<el-select style="width:180px;" v-model="value" @change="Town(value)" placeholder="选择排序方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入姓名"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search()" class="search-btn">搜索</el-button>
        </div>
        <p class="box-card1">付款用户列表</p>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        height="480">
          <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="userInfoName" label="姓名" width="150"></el-table-column>
          <el-table-column align="center" prop="userInfoTown" label="原籍镇" width="200"></el-table-column>
          <el-table-column align="center" prop="userInfoVillage" label="原籍村" width="200"></el-table-column>
          <el-table-column align="center" prop="donationNumber" label="金额 (元)"></el-table-column>
          <el-table-column align="center" label="修改金额" width="120">
            <template slot-scope="scope">
              <el-button
                @click="revise(scope.row)"
                icon="el-icon-edit"
                size="medium">
              </el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="curPageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalnum"
            background>
          </el-pagination>
        </div>
      </div>

      <div class="container-right">
        <div class="opera-div">
          <el-button type="primary" plain @click="reset()">新增付款</el-button>
          <el-dialog title="添加付款用户" :visible.sync="dialogFormVisible" width="410px">
            <el-form :model="numberValidateForm" :rules="rules1" ref="numberValidateForm" label-width="100px" >
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="numberValidateForm.name" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="原籍：" prop="region1">
                <el-cascader
                  expand-trigger="hover"
                  :options="region"
                  v-model="numberValidateForm.region1">
                </el-cascader>
              </el-form-item>
              <el-form-item label="金额：" prop="number">
                <el-input  v-model="numberValidateForm.number" style="width:220px" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-button type="success" @click="ranking" plain style="position: absolute; right: 0;">生成排行榜</el-button>
        </div>
        <div class="box-card2">
          <span>忠门籍</span>
          <div class="rule"></div>
          <h4>总金额：{{money}}元</h4>
          <h4>总人数：{{people}}人</h4>
        </div>
        <div v-for="(item, index) in countList" v-bind:key="index" class="box-card2">
          <span>{{index}}</span>
          <div class="rule"></div>
          <h4>总金额：{{item.money}}元</h4>
          <h4>总人数：{{item.people}}人</h4>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import MyTop from "./top.vue"
import MyNav from "./nav.vue"

export default {
  name: 'AdminPay',
  data () {
      var validateNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入金额'));
        } else if(!/^\d+(\.\d{1,2})?$/.test(value)){
          callback(new Error('请输入正确的金额'));
        } else {
          callback();
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
    return {
      rules1: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        number: [
          { validator: validateNumber }
        ],
      },
      numberValidateForm: {
        region1: [],
        name:'',
        number: ''
      },
      money:0,
      people:0,
      dialogFormVisible: false,
      curPageNum: 1,
      totalnum: 10,
      pageSize: 7,
      form: {
        region1: [],
        name: '',
        money: '',
      },
      formLabelWidth: '70px',
      options: [
        {
          value: "山亭",
          label: "山亭"
        },
        {
          value: "忠门",
          label: "忠门"
        },
        {
          value: "东埔",
          label: "东埔"
        },
        {
          value: "月塘",
          label: "月塘"
        }
      ],
      region: [
        {
          value: "山亭",
          label: "山亭",
          children:[{value:"西乌垞",label:'西乌垞'},{value:"东乌垞",label:'东乌垞'},{value:'新乌垞',label:'新乌垞'},{value:'山柄',label:'山柄'},{value:'东店',label:'东店'},{value:'西埔',label:'西埔'},{value:'西埔口',label:'西埔口'},{value:'山亭',label:'山亭'},{value:'蒋山',label:'蒋山'},{value:'利山',label:'利山'},{value:'港里',label:'港里'},{value:'西前',label:'西前'},{value:'莆禧',label:'莆禧'},{value:'东仙',label:'东仙'},{value:'文甲',label:'文甲'}],
        },
        {
          value: "忠门",
          label: "忠门",
          children:[{value:"后坑",label:'后坑'},{value:"安柄",label:'安柄'},{value:'柳厝',label:'柳厝'},{value:'沁头',label:'沁头'},{value:'秀华',label:'秀华'},{value:'秀田',label:'秀田'},{value:'秀前',label:'秀前'},{value:'琼山',label:'琼山'},{value:'忠门',label:'忠门'},{value:'王厝',label:'王厝'},],
        },
        {
          value: "东埔",
          label: "东埔",
          children:[{value:'何山',label:'何山'},{value:'东坑',label:'东坑'},{value:'前范',label:'前范'},{value:'度口',label:'度口'},{value:'东埔',label:'东埔'},{value:'下坑',label:'下坑'},{value:'塔林',label:'塔林'},{value:'乐屿',label:'乐屿'},{value:'西山',label:'西山'},{value:'度下',label:'度下'},{value:'梯亭',label:'梯亭'},{value:'吉成',label:'吉成'},{value:'东吴',label:'东吴'}],
        },
        {
          value: "月塘",
          label: "月塘",
          children:[{value:'东潘',label:'东潘'},{value:'砺山',label:'砺山'},{value:'洋埭',label:'洋埭'},{value:'岱(蚮)前',label:'岱(蚮)前'},{value:'前康',label:'前康'},{value:'西园',label:'西园'},{value:'双告山',label:'双告山'},{value:'月埔',label:'月埔'},{value:'霞塘',label:'霞塘'},{value:'坂尾',label:'坂尾'},{value:'联星',label:'联星'}]
        }
      ],
      value: '',
      input: '',
      tableData: [],
      countList: {
        山亭镇 : {
          money: 10000,
          people: 1000
        },
        忠门镇:{
          money: 9000,
          people: 1000
        },
        东埔镇:{
          money: 9000,
          people: 1000
        },
        月塘镇:{
          money: 8000,
          people: 999
        }
      }
    }
  },
  components: {
    MyTop,
    MyNav
  },
  created() {
    this.axios({
      url: this.baseUrl + "/donation/search",
      method: "post",
      data:{
        "pageNum": this.curPageNum,
        "pageSize": this.pageSize,
      }
    })
      .then(res => {
        this.tableData = res.data.data.donationVOList;
        this.totalnum = res.data.data.maxPageNum * this.pageSize;
      })
      .catch(error => {
        console.log(error);
      });

    this.axios({
      url: this.baseUrl + "/donation/count",
      method: "get",
    })
      .then(res => {
        this.countList=res.data.data.townCountMap
        this.money=res.data.data.money
        this.people=res.data.data.people
      })
      .catch(error => {
        console.log(error);
      });
  },
  watch:{
    dialogFormVisible(val0,val1){
      //this.resetForm('numberValidateForm')
    }
  },
  methods: {
    indexMethod(index) {
      return (this.curPageNum-1)*this.pageSize + index + 1;
    },
    reset(){
      //this.form.region1=[]
      //this.form.name=""
      //this.form.money=""
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.numberValidateForm.region1.length==0||this.numberValidateForm.name==''||this.numberValidateForm.number==''){
            this.$message({
              type: "warning",
              message: "内容不能为空！"
            });
            return;
          }
          //this.dialogFormVisible = false
          this.axios({
            url: this.baseUrl + "/donation/user/add",
            method: "post",
            data:{
              "donationNumber": this.numberValidateForm.number,
              "userInfoName": this.numberValidateForm.name,
              "userInfoTown": this.numberValidateForm.region1[0],
              "userInfoVillage": this.numberValidateForm.region1[1]
            }
          })
            .then(res => {
              this.axios({
                url: this.baseUrl + "/donation/count",
                method: "get",
              })
                .then(res => {
                  this.countList=res.data.data.townCountMap
                  this.money=res.data.data.money
                  this.people=res.data.data.people
                })
                .catch(error => {
                  console.log(error);
                });

              this.axios({
                url: this.baseUrl + "/donation/search",
                method: "post",
                data: {
                  pageNum: this.curPageNum,
                  pageSize: this.pageSize,
                  userInfoName: this.input
                }
              })
                .then(res => {
                  console.log(res.data);
                  this.tableData = res.data.data.donationVOList;
                  this.totalnum = res.data.data.maxPageNum * this.pageSize;
                })
                .catch(error => {
                  console.log(error);
                });
                this.$message({
                  type: "success",
                  message: "添加成功！"
                });
                this.resetForm('numberValidateForm')
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      if(this.$refs[formName]!== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    search(){
      this.axios({
        url: this.baseUrl + "/donation/search",
        method: "post",
        data: {
          pageNum: this.curPageNum,
          pageSize: this.pageSize,
          userInfoName: this.input
        }
      })
        .then(res => {
          console.log(res.data);
          //console.log(res.data.data.userInfoName);
          this.tableData = res.data.data.donationVOList;
          this.totalnum = res.data.data.maxPageNum * this.pageSize;
        })
        .catch(error => {
          console.log(error);
        });
    },
    ranking: function() {
      this.$prompt("请输入最小金额", "生成排行榜", {
        inputPlaceholder: '最小金额',
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
      .then(({ value }) => {
        this.$router.push({
          path: "/admin/rankinglist",
          query: {
            minNum: value
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消输入"
        });
      });
    },
    revise: function(row) {
      this.$prompt("您正在为用户 " + row.userInfoName + " 修改捐款金额：", "修改金额", {
        inputPlaceholder: '捐款金额',
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
      .then(({ value }) => {
        // value值就是input的value
        this.axios({
          url: this.baseUrl + "/donation/user/update?donationId="+ row.donationId +"&donationNumber="+value,
          method: "post",
          data: {
            donationId: row.donationId,
            donationNumber: value
          }
        })
          .then(res => {
            this.axios({
              url: this.baseUrl + "/donation/count",
              method: "get",
            })
              .then(res => {
                this.countList=res.data.data.townCountMap
                this.money=res.data.data.money
                this.people=res.data.data.people
              })
              .catch(error => {
                console.log(error);
              });
            this.axios({
              url: this.baseUrl + "/donation/search",
              method: "post",
              data: {
                pageNum: this.curPageNum,
                pageSize: this.pageSize,
                userInfoName: this.input
              }
            })
              .then(res => {
                console.log(res.data);
                this.tableData = res.data.data.donationVOList;
                this.totalnum = res.data.data.maxPageNum * this.pageSize;
              })
              .catch(error => {
                console.log(error);
              });

            this.$message({
              type: "success",
              message: "修改成功！"
            });
            console.log(res.data);
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
      this.curPageNum = val;
      this.axios({
        url: this.baseUrl + "/donation/search",
        method: "post",
        data: {
          pageNum: this.curPageNum,
          pageSize: this.pageSize,
          userInfoName: this.input
        }
      })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data.donationVOList;
          this.totalnum = res.data.data.maxPageNum * this.pageSize;
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>

<style scoped>
.el-dialog{
  top:10%;
}
.main {
  min-width: 1301px;
  min-height: 701px;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}

.container {
  display: flex;
  min-width: 860px;
  padding-top: 70px;
  padding-left: 220px;
  text-align: left;
  background-color: #f4f4f4;
}

.container-left{
  flex: 1 1 auto;
  width: 100%;
  min-width: 600px;
}

.search-div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
}

.search-btn {
  margin-left: 10px;
}

.box-card1 {
  padding: 11px 20px;
  margin: 15px 0;
  border-radius: 3px;
  font-size: 14px;
  background: #fff;
}

.block {
  margin: 20px auto;
  text-align: center;
}

.box-card3 {
  line-height: 24px;
  padding: 10px 20px;
  margin: 15px 0;
  border-radius: 2px;
  font-size: 14px;
  background: #fff;
}

.container-right{
  width: 224px;
  margin: 0 20px;
}

.opera-div {
  position: relative;
}

.box-card2{
  width: 200px;
  height: 96px;
  padding: 10px 12px;
  margin: 15px 0;
  border-radius: 3px;
  font-size: 14px;
  background-color: #fff;
}

.box-card2 span{
  display: block;
  font-weight: bold;
  padding-left: 5px;
  margin-bottom: 10px;
}

.rule{
  margin: 10px auto;
  height: 0px;
  width: 200px;
  border-bottom: 1px solid #BBBBBB;
}

.box-card2 h4 {
  display: block;
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  display: inline-block;
  margin-bottom: 7px;
  font-size: 14px;
}
</style>
