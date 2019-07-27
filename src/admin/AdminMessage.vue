<template>
  <div class="main">
    <MyTop></MyTop>
    <MyNav :navid="'5'"></MyNav>
    <div class="container">
      <div class="message-div">
        <el-form :label-position="labelPosition" ref="form" :model="form" label-width="50px">
          <el-form-item style="text-align:left;" label="主题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <el-input type="textarea" :rows="15" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">发布</el-button>
            <el-button @click="reset()">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import MyTop from "./top.vue"
import MyNav from "./nav.vue"

export default {
  name: "AdminMessage",
  data() {
    return {
      labelPosition:"right",
      form: {
          name: '',
          desc: ''
        }
    };
  },
  components: {
    MyTop,
    MyNav
  },
  methods: {
    onSubmit() {
      if(this.form.name==''||this.form.desc==''){
        this.$message({
          type: "warning",
          message: "内容不能为空！"
        });
        return;
      }
      var _this=this
      this.$confirm("是否发布消息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.axios({
          url: this.baseUrl + "/message/add",
          method: "post",
          data:{
            "content": this.form.desc,
            "title":this.form.name
          }
        })
        .then(function(res) {

          _this.$message({
            type: "success",
            message: "发布成功!"
          });
          _this.reset();
        })
        .catch(function(error) {
          console.log(error);
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消发布"
        });
      });
    },
    reset() {
      this.form.name="";
      this.form.desc="";
    }
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
  background-color: #f4f4f4;
}

.message-div {
  padding: 30px 25px 15px 15px;
  border-radius: 3px;
  background-color: #fff;
}
</style>
