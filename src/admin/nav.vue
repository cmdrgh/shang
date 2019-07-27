<template>
  <div class="nav">
    <el-menu :default-active="navid" router class="el-menu-vertical-demo" @select="clickon" :collapse="isCollapse">
      <el-menu-item index="1" route="/admin/user_management">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <div v-show="show"><el-menu-item index="2" route="/admin/payment_management">
        <i class="el-icon-goods"></i>
        <span slot="title">付款管理</span>
      </el-menu-item>

      <el-menu-item index="3" route="/admin/payregis_management">
        <i class="el-icon-circle-check-outline"></i>
        <span slot="title">签到管理</span>
      </el-menu-item>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span slot="title" style="font-size: 14px;">抽奖管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" route="/admin/raffle">抽奖码与奖品</el-menu-item>
          <el-menu-item index="4-2" route="/admin/lottery">抽奖</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="5" route="/admin/message">
        <i class="el-icon-message"></i>
        <span slot="title">发布消息</span>
      </el-menu-item>

      <el-menu-item index="6" route="/admin/delete">
        <i class="el-icon-delete"></i>
        <span slot="title">清空记录</span>
      </el-menu-item>
      </div>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "MyNav",
  data() {
    return {
      show:true,
      isCollapse: false
    };
  },
  created(){
    if(this.$cookies.get('identity')==="10002")
    this.show=false
  },
  watch:{
  },
  props: {
    navid: String
  },
  methods: {
    clickon(key) {
      console.log(key);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.nav {
  position: fixed;
  top: 55px;
  left: 0;
  display: flex;
  height: 100%;
  z-index: 90;
}

li {
  text-align: left;
  font-size: 14px;
}
</style>
