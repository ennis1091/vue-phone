<template>
  <div class="list">
    <list :loading="loading" class="list" @getPage="getPage">
      <router-link
        tag="li"
        to="/"
        v-for="(item, index) in listView"
        :key="index"
      >
        {{ item.id }}
        <img :src="item.urlImg" style="width:30%" />
      </router-link>
    </list>
  </div>
</template>

<script type="text/ecmascript-6">
import list from "@/base/list/list";
import {mapActions,mapState,mapMutations} from 'vuex';
export default {
  created() {
    this.reset_list()
  },
  computed:mapState([
    'listView'
  ]),
  data() {
    return {
      payload:{
        page:1,
        pageSize:10
      },
      loading:false
    }
  },
  methods:{
    ...mapActions(['getList']),
    ...mapMutations(['reset_list']),
    getPage() {
      this.loading = true;
      this.getList(this.payload).then((data) => {

        ++this.payload.page

        if(data.length<this.pageSize){   //无数据终止请求
           this.loading=true
        }else{
           this.loading=false
        }
      },(err) => {
        console.log(err)
      })
    },
    screenAll() {
      this.reset_list()
      this.payload.page=1
      this.getPage()
    },
    screenIn() {
      this.reset_list()
      this.payload.page=1
      this.getPage()
    },
    screenOut() {
      this.reset_list()
      this.payload.page=1
      this.getPage()
    }
  },
  components: {
      list
  }
}
</script>

<style scoped lang="scss">
.list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 145px;
  right: 0;
  background: #fff;
  /deep/ .more-d {
    overflow: scroll;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  /deep/ .li-l li {
    padding: 20px;
    color: red;
  }
  .nav {
    display: flex;
    justify-content: space-around;
  }
}
</style>
