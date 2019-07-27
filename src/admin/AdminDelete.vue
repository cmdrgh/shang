<template>
  <div class="main">
    <MyTop></MyTop>
    <MyNav :navid="'6'"></MyNav>
    <div class="container">
      <div class="delete-div">
        <el-button @click="Delete()" type="danger" class="btn">删除记录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyTop from "./top.vue"
import MyNav from "./nav.vue"

export default {
  name: "AdminDelete",
  data() {
    return {
      labelPosition:"right",
      form: {
          name: '',
          region: '',
          desc: ''
        }
    };
  },
  components: {
    MyTop,
    MyNav
  },
  methods: {
      Delete() {
      var _this = this;

      this.$confirm("此操作将永久删除付款记录、签到记录以及抽奖记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
          this.axios({
            url:  this.baseUrl + '/record/delete',
            method: 'get'
          })
          .then(function(res) {
            console.log(res);
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(function(error) {
            console.log(error);
          });
    })
    .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
    });
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
  background-color: #f4f4f4;
}

.delete-div {
  width: 100%;
  padding:250px 0;
  padding-bottom: 260px;
  border-radius: 3px;
  text-align: center;
  background: #fff;
}

.btn {
  padding: 16px 20px;
  font-size: 16px;
}
</style>
