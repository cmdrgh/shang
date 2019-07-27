<template>
  <div class="main">
    <header class="head">消息列表</header>
    <ul class="noticeList">
      <li v-for="item in noticeList" v-bind:key="item.messageId" class="notice" @click="toDetail(item.messageId)">
        <p class="notice-title">{{item.title}}</p>
        <p class="notice-time">{{year(item.messageTimestamp)}}/{{month(item.messageTimestamp)}}/{{date(item.messageTimestamp)}}</p>
      </li>
    </ul>
    <Navigation :tagid="3"></Navigation>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'Notice',
  data () {
    return {
      noticeList: [
        {
          messageId: 0,
          title: '',
          messageTimestamp: ''
        },
      ]
    }
  },
  components: {
    Navigation
  },
  created() {
    var _this = this;

    this.axios({
      url: this.baseUrl + '/message/list',
      method: 'get'
    })
    .then(function(res) {
      // console.log(res);
      _this.noticeList = res.data.data;

    })
    .catch(function(error) {
      console.log(error);
    })
  },
  methods: {
    toDetail: function(val) {
      var _this = this;
      this.$router.push({
        path: "/NoticeDetail",
        query: {
          noticeId: val
        }
      });
    },
    year: function(val) {
      // console.log(val);
      val = parseInt(val*1000);
      let date = new Date(val);
      let y = date.getFullYear();

      return y;
    },
    month: function(val) {
      val = parseInt(val*1000);
      let date = new Date(val);
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;

      return MM;
    },
    date: function(val) {
      val = parseInt(val*1000);
      let date = new Date(val);
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return d;
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 0.52rem;
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

.noticeList {
  padding: 1.3rem 0.24rem;
  padding-bottom: 1.66rem;
  font-size: 0.6rem;
  /* background-color: salmon; */
}

.notice {
  position: relative;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0.3rem 0.16rem;
  border-bottom: 1px solid #ebebeb;
  list-style: none;
}

.notice-title {
  max-width: 6.8rem;
  text-align: left;
  font-weight: bold;
  letter-spacing: 1px;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notice-time {
  position: absolute;
  top: 0.22rem;
  right: 0.16rem;
  font-size: 0.44rem;
  color: #909399;
}
</style>
