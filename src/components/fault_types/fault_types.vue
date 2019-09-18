<template>
  <div class="type">
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
          <router-link
            :to="{ name: 'details' }"
            tag="li"
            v-for="(item, index) in data"
            :key="index"
          >
            <h3><span>设备名称</span><span class="btn">故障</span></h3>
            <div class="word">
              <p>
                <span class="p-li">
                  <i></i>
                  <span><b>故障时间</b>：2019-06-27 10:22:23</span>
                </span>
                <span class="p-li">
                  <i></i>
                  <span><b>故障时间</b>：2019-06-27 10:22:23</span>
                </span>
              </p>
              <i class="iconfont icon-xiangqian"></i>
            </div>
          </router-link>
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
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { reqList } from '@/api'
export default {
   mounted() {
    this.getPage()
    },
  beforeRouteEnter (to, from, next) {
  next(vm => {
        window.document.title=to.params.type
        console.log(to)
      // 通过 `vm` 访问组件实例
    })
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
    },
     addPage() {
           this.$router.push(
               {name:'addProduct'}
           )
       }
  }
}
</script>

<style scoped lang="scss">
.type {
  @include bg-fixed(0, 0, $bgColor, 5);
  .list {
    margin-top: 20px;
    height: calc(100% - 20px);
    overflow: hidden;
    ul {
      li {
        background: #fff;
        margin-bottom: 10px;
        h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 25px;
          font-size: 30px;
          border-bottom: 1px solid $bgColor;
          .btn {
            padding: 8px 15px;
            background: #0086f8;
            color: #fff;
            border-radius: 25px;
            font-size: 24px;
          }
        }
        .word {
          display: flex;
          justify-content: space-between;
          padding: 25px;
          align-items: center;
          font-size: 26px;
          p {
            display: flex;
            flex-direction: column;
            color: #5c5c5c;
            b {
              color: #8e8e8e;
              font-weight: normal;
            }
            .p-li {
              padding: 5px 0;
            }
          }
          .icon-xiangqian {
            color: #dcdcdc;
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
