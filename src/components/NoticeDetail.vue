<template>
  <div class="main">
    <header class="head">
      <img class="reback" src="../assets/reback.png" @click="reback">
      通知
    </header>
    <div class="content">
      <p class="title">{{title}}</p>
      <pre class="maincontent">{{content}}</pre>
      <p class="time">发布于 {{year}}/{{month}}/{{date}}</p>
    </div>
    <Navigation :tagid="3"></Navigation>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'NoticeDetail',
  data () {
    return {
      title: '',
      year: '',
      month: '',
      date: '',
      content: ''
    }
  },
  components: {
    Navigation
  },
  created() {
    var param = this.$route.query.noticeId;
    var _this = this;

    this.axios({
      url: this.baseUrl + '/message/detail?messageId=' + param,
      method: 'get'
    })
    .then(function(res) {
      console.log(res);
      _this.title = res.data.data.title;
      _this.content = res.data.data.content;

      let time = res.data.data.messageTimestamp;
      time = parseInt(time*1000);
      let date = new Date(time);

      _this.year = date.getFullYear();

      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      _this.month = MM;

      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      _this.date = d;
    })
    .catch(function(error) {
      console.log(error);
    })
  },
  methods: {
    reback: function() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 0.52rem;
  /* background-color: #f4f4f4; */
  background-color: #fff;
}

.head {
  position: relative;
  width: 100%;
  padding: 0.28rem 0;
  border-bottom: 1px solid #ebebeb;
  color: #f39839;
  background-color: #fff;
}

.reback {
  position: absolute;
  top: 0.42rem;
  left: 0.36rem;
  width: 0.5rem;
}

.content {
  padding: 0.6rem;
  padding-bottom: 2rem;
  text-align: left;
}

.title {
  padding-bottom: 0.7rem;
  font-size: 0.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #303133;
}

.maincontent {
  letter-spacing: 1px;
  font-size: 0.56rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.time {
  padding: 0.5rem 0;
  font-size: 0.46rem;
  color: #909399;
  text-align: right;
}
</style>
