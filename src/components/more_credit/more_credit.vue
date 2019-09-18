<template>
  <div class="more">
    <header>
      <span
        v-for="(item, index) in title"
        :key="index"
        :class="{ active: index == currIndex }"
        @click="switchNav(index)"
      >
        {{ item }}
      </span>
    </header>
    <div class="data">
      <cant @bIndex="bIndex" @sIndex="sIndex"></cant>
      <span>
        共计：
        <i>￥130</i>
      </span>
    </div>
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
            tag="li"
            :to="{ name: 'bill' }"
            v-for="(item, index) in data"
            :key="index"
          >
            <img v-lazy="" alt="" />
            <div class="middle">
              <span>
                123456798
              </span>
              <span>
                2019-06-12 11:22:23
              </span>
            </div>
            <div class="last">
              <span>+13.1</span>
              <span>
                在途中
              </span>
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
import cant from '@/base/cant/cant'
import { reqList } from '@/api'
import {mapMutations} from 'vuex';
export default {
  mounted() {
    this.getPage()
    },
  data() {
    return {
      title:['全部','已入账','在途中'],
      currIndex:0,
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
      pulldown:true
    }
  },
  components: {
    cant
  },
  methods: {
    async getPage() {
      this.payload.page=1
      this.isEnd=true
       try {
         const result = await reqList(this.payload.page,this.payload.pageSize)
         if (result.code === 0) {
            const newdata = result.data
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
      this.payload.page++
      this.isPullUpLoad=true
      try {
         const result = await reqList(this.payload.page,this.payload.pageSize)
         if (result.code === 0) {
            const newdata = result.data
            this.data=this.data.concat(newdata)
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
    },
    async reflsh() {
        this.beforePullDown=false
        await this.getPage()
    },
    switchNav(i) {
      this.currIndex=i
    },
    ...mapMutations(['reset_index']),
    bIndex() {
      this.reset_index(4)
    },
    sIndex(){
      this.reset_index(2)
    }
  }
}
</script>

<style scoped lang="scss">
.more {
  @include bg-fixed(0, 0, $bgColor, 5);
  header {
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    span {
      line-height: 94px;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .active {
      color: #0086f8;
      border-bottom: 6px solid #0086f8;
    }
  }
  .data {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 80px;
    padding: 0 25px;
    align-items: center;
    span {
      font-size: 24px;
      i {
        color: #0086f8;
      }
    }
  }
  .list {
    @include bg-fixed(180px, 0, $bgColor, 5);
    overflow-y: hidden;
    li {
      border-bottom: 1px solid #f3f3f3;
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 25px;
      align-items: center;
      img {
        width: 58px;
        height: 58px;
        border-radius: 5px;
        padding-right: 20px;
      }
      .middle {
        flex: 1;
        text-align: left;
        display: flex;
        flex-direction: column;
      }
      .last {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
