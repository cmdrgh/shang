<template>
  <div class="top">
    <span class="top1">莆田忠门籍在榕乡亲通讯平台</span>
    <div class="top2">
      欢迎您 &nbsp;{{username}}<span class="text2">|</span><span class="quit" @click="logoff">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTop",
  data() {
    return {
      username: '',
    }
  },
  created() {
    this.username = this.$cookies.get('adminname');
  },
  methods: {
    logoff: function() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$cookies.remove('token');
        this.$cookies.remove('token2');
        this.$router.push("/admin");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
};
</script>

<style scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1301px;
  width: 100%;
  height: 54px;
  line-height: 54px;
  padding: 0;
  box-shadow: 0 0 8px #EBEEF5;
  font-size: 18px;
  text-align: left;
  background: #fff;
  z-index: 99;
}
.top1{
  margin: 0 24px;
}
.top2{
  position: absolute;
  top: 0;
  right: 24px;
  height: 54px;
  line-height: 54px;
  font-size: 14px;
  font-weight: normal;
}

.text2{
  margin: 0 15px;
  color: #DCDFE6;
}
.quit:hover{
  cursor: pointer;
  color: #409EFF;
}

</style>
