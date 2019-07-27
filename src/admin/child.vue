<template>
  <div>
    child
  </div>
</template>

<script>
  export default {
    name: "child",
    methods: {
      parentHandleclick(e) {
        console.log(e)
      }
    }
  }
</script>
