<template>
  <div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="li-l"
    >
      <slot></slot>
      <!-- <router-link tag="li" to="/" v-for="(item, index) in list" :key="index">
          {{ item.id }}
          <img :src="item.urlImg" style="width:30%" />
        </router-link> -->
    </ul>
    <p class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      <span>
        加载中...
      </span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
      list: {
          type: Array,
          default: () => []
      },
      loading:{
        type: Boolean,
        default:false
      }
    },
  methods: {
    loadMore() {
      this.$emit('getPage');
     }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.li-l {
  padding-bottom: 20px;
}
.page-infinite-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 0 10px;
  }
}
</style>
