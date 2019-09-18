<template>
  <div class="details">
    <h3>
      <span class="title-name1">设备名称</span>
      <span class="title-name2">到期时间</span>
      <span class="title-name3">续费时间</span>
      <span class="title-name4">续费金额</span>
    </h3>
    <div class="scroll">
      <list :loading="loading" class="list" @getPage="getPage">
        <li v-for="(item, index) in listView" :key="index">
          <span class="title-name1">
            MAFU测试设备
          </span>
          <span class="title-name2">
            2021-04-24
          </span>
          <span class="title-name3">
            12个月
          </span>
          <span class="title-name4 color">
            ￥19.22
          </span>
        </li>
      </list>
    </div>
    <div class="footer">
      <span>续费设备：<i>10台</i></span>
      <span>续费总计：<b>￥20.00</b></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import list from "@/base/list/list";
import {mapActions,mapState,mapMutations} from 'vuex';
export default {
  created() {
    this.reset_list()
  },
  computed:{
    ...mapState(['listView'])
  },
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
    }
  },
  components: {
      list
  }
}
</script>

<style scoped lang="scss">
.details {
  @include bg-fixed(0, 0, $bgColor, 5);
  h3 {
    height: 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f4ff;
    color: #0086f8;
    span {
      border-right: 1px solid #bae5fe;
      &:last-child {
        border: none;
      }
    }
  }
  .scroll {
    position: fixed;
    top: 82px;
    left: 0;
    right: 0;
    bottom: 145px;
    overflow-y: scroll;
    ul {
      li {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-of-type(2n) {
          background: #f7fbff;
        }
        span {
          @include ellipsis;
          padding: 28px;
          font-size: 24px;
          box-sizing: border-box;
        }
        .color {
          color: #f88c00;
        }
      }
    }
  }
  .title-name1 {
    width: 220px;
  }
  .title-name2 {
    width: 220px;
  }
  .title-name3 {
    width: 160px;
  }
  .title-name4 {
    width: 150px;
  }
  .footer {
    padding: 20px;
    position: fixed;
    height: 145px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    z-index: 4;
    display: flex;
    justify-content: space-around;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 30px;
    font-weight: bold;
    color: #555555;
    i {
      color: #0086f8;
    }
    b {
      font-size: 38px;
      color: #f88c00;
    }
  }
}
</style>
