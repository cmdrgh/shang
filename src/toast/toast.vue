<template>
  <div class="wrapp" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style scoped>
.wrapp{
  position: fixed;
  left: 50%;
  top:50%;
  background: rgba(0,0,0,.35);
  padding: 0.4rem;
  border-radius: 8px;
  transform: translate(-50%,-50%);
  font-size: 0.52rem;
  letter-spacing: 1px;
  text-align: center;
  color:#fff;
  z-index: 99;
}

.fadein {
  animation: animate_in 0.25s;
}

.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}

@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>
