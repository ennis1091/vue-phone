<template>
  <div id="wrap" @click="close">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index"
        @click.stop="selectNum($event)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        data:{
            type:Array,
            default:() => []
        }
    },
  data() {
    return {

    }
  },
  components: {

  },
  methods:{
      close() {
          this.$emit('closeAlert')
      },
      selectNum(e){
          let value= e.currentTarget.innerHTML
          let str = value.replace(/\s*/g,"") //去除前后空格
          this.$emit('selectText',str)
      }
  }
}
</script>

<style scoped lang="scss">
#wrap {
  @include bg-fixed(0, 0, rgba($color: #000000, $alpha: 0.3), 77);
  ul {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 777;
    background: #fff;
    li {
      padding: 46px 0;
      text-align: center;
      border-bottom: 1px solid #b7ddfd;
      color: #0086f8;
      &:last-child {
        border: none;
      }
      &:hover {
        background: #cce7fe;
      }
    }
  }
}
</style>
