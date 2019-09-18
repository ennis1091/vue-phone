<template>
  <div class="page">
    个人中心
  </div>
</template>

<script type="text/ecmascript-6">
import ajax from '@/api/ajax.js'
export default {
  async created() {
    // this.$http.get('https://easy-mock.com/mock/5cdcc45ede625c6ccadfd711/example/query').then(
    //       res => {
    //         alert(3)
    //         this.roomDetail = res.data.data;
    //       },
    //       err => {
    //         console.log("接受数据错误" + err);
    //       }
    //     ).catch(err => {
    //       console.log("服务器错误" + err);
    //     })

    let data = await ajax('query',{tt:'tta'})
    let post = await ajax('upload',{new:'a'},'POST')
    console.log(data)
    console.log(post)
    console.log(this)
  },
  data() {
    return {

    }
  },
  methods:{
     getq() {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss"></style>
