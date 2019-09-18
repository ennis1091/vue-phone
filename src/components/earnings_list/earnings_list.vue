<template>
  <div class="order">
    <scroll
      ref="scroll"
      :data="data"
      :useTransition="useTransition"
      :pullup="pullup"
      :pulldown="pulldown"
      @scrollToEnd="scrollToEnd"
      @pulldown="reflsh"
      class="list"
    >
      <div>
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>刷新成功</span></div>
          </div>
        </div>
        <ul>
          <li v-for="(item, index) in data" :key="index">
            <h3>
              设备名称
            </h3>
            <div class="content">
              <p>
                <span>收益</span>
                <span class="yellow">2323<i>元</i></span>
              </p>
              <p>
                <span>营业额</span>
                <span class="yellow">2323<i>元</i></span>
              </p>
              <p>
                <span>订单数</span>
                <span class="blue">20<i>单</i></span>
              </p>
            </div>
            <div class="footer">
              <span>编号：236564564564564</span>
              <span>日期：2019-06-16</span>
            </div>
          </li>
        </ul>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">{{ endword }}</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">加载中...</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { reqList } from '@/api'
export default {
  mounted() {
    this.getPage()
    },
  data() {
    return {
      data:[],
      payload:{
        page:1,
        pageSize:10
      },
      useTransition:false,
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      endword:'加载中...',
      isEnd:true,
      pullup:true,
      pulldown:true,
      touchMore:false
    }
  },
  methods:{
    async getPage() {
      this.payload.page=1
      this.isEnd=true
       try {
         const result = await reqList(this.payload.page,this.payload.pageSize)
         if (result.code === 0) {
            const newdata = result.data
             if (this.payload.page>20) {
              this.isEnd=false
              this.isPullUpLoad=false
              this.endword='没有更多数据'
            }
            this.data=newdata
            this.beforePullDown=true
          } else {
            console.log(result)
            this.$toast('加载失败')
          }

       } catch (err) {
         this.$toast('加载失败')
       }
    },
    async scrollToEnd() {
      if (!this.isEnd) {
        return
      }
      if (!this.touchMore){
        this.payload.page++
      this.isPullUpLoad=true
      this.touchMore=true
      try {
         const result = await reqList(this.payload.page,this.payload.pageSize)
         if (result.code === 0) {
            const newdata = result.data
            this.data=this.data.concat(newdata)
            this.touchMore=false
            if (this.payload.page>20) {
              this.isEnd=false
              this.isPullUpLoad=false
              this.endword='没有更多数据'
            }
          } else {
            console.log(result)
            this.$toast('加载失败')
          }

       } catch (err) {
         console.log(err)
       }
      }
    },
    async reflsh() {
        this.beforePullDown=false
        await this.getPage()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.order {
  @include bg-fixed(0, 0, $bgColor, 99999999);
  .list {
    margin-top: 20px;
    height: calc(100% - 20px);
    overflow: hidden;
    ul {
      li {
        background: #fff;
        margin-bottom: 10px;
        h3 {
          padding: 20px 20px 0;
          font-size: 30px;
        }
        .content {
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #efefef;
          p {
            display: flex;
            flex-direction: column;
            color: #8e8e8e;
            span {
              padding: 5px;
            }
            .yellow {
              color: #f88c00;
              font-size: 30px;
              font-weight: bold;
              i {
                font-size: 24px;
              }
            }
            .blue {
              color: #0086f8;
              font-size: 30px;
              font-weight: bold;
              i {
                font-size: 24px;
              }
            }
          }
        }
        .footer {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
