<template>
  <div>
    <button @click="clickParent">点击</button>
    <child ref="mychild"></child>
  </div>
</template>

<script>
  import Child from './num';
  export default {
    name: "parent",
    components: {
      child: Child
    },
    methods: {
      clickParent() {
        this.$refs.mychild.test();
      }
    }
  }
</script>
