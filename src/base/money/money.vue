<template>
  <div class="page">
    <h3 class="title">
      <i @click="go">
        《
      </i>
      营业额
    </h3>
    <div></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  methods:{
      go(){
          this.$router.go(-1)
      }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 100px;
  right: 0;
  background: #fff;
  .title {
    text-align: center;
    position: relative;
    i {
      position: absolute;
      left: 10px;
    }
  }
}
</style>
