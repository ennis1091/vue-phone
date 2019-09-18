<template>
  <div class="man">
    <div id="add-product">
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="请输入产品名称" />
      </div>
      <div class="add" @click="addPage">
        <i class="iconfont icon-icon-add"></i>
        <span>添加</span>
      </div>
    </div>
    <scroll
      ref="scroll"
      :data="data"
      :useTransition="useTransition"
      :pullup="pullup"
      :pulldown="pulldown"
      @scrollToEnd="scrollToEnd"
      @pulldown="reflsh"
      class="product-list"
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
            <h5>产品名称<span>修改</span></h5>
            <div class="word">
              <img v-lazy="item.urlImg" alt="" />
              <div class="text">
                <p>
                  <span
                    ><i class="v-c"></i
                    ><b>产品价格：</b>1元&nbsp;&nbsp;1分钟</span
                  ><span
                    ><i class="v-c"></i><b>实投币：</b><i>5555555555</i>枚</span
                  >
                </p>
                <p>
                  <span><i class="v-c"></i><b>附加属性：</b>无</span>
                </p>
              </div>
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
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.man {
  @include bg-fixed(0, 0, $bgColor, 55);
  #add-product {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0px 0 15px;
    height: 100px;
    background: #fff;
    .search {
      flex: 1;
      padding: 20px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background: $bgColor;
      border-radius: 10px;
      color: #c2c2c2;
      i {
        font-size: 28px;
        padding-right: 16px;
      }
      input {
        font-size: 28px;
        flex: 1;
        color: #555;
        border: none;
        background: $bgColor;
        &::-webkit-input-placeholder {
          color: #c2c2c2;
        }
        &::-moz-placeholder {
          color: #c2c2c2;
        }
        &:-moz-placeholder {
          color: #c2c2c2;
        }
        &:-ms-input-placeholder {
          color: #c2c2c2;
        }
      }
    }
    .add {
      width: 90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #0086f8;
      .icon-icon-add {
        font-size: 30px;
      }
    }
  }
  .product-list {
    position: fixed;
    top: 120px;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    .page-infinite-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        padding: 0 10px;
      }
    }
    ul {
      li {
        background: #fff;
        margin-bottom: 10px;
        h5 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 29px 27px;
          border-bottom: 1px solid $bgColor;
          font-size: 30px;
          span {
            font-size: 24px;
            font-weight: normal;
            color: #0086f8;
            border: 2px solid #0086f8;
            padding: 6px 30px;
            border-radius: 25px;
          }
        }
        .word {
          display: flex;
          padding: 29px 27px;
          justify-content: center;
          align-items: center;
          @include ellipsis;
          img {
            width: 94px;
            height: 94px;
          }
          .text {
            flex: 1;
            width: 100%;
            @include ellipsis;
            p {
              display: flex;
              padding: 10px 0 5px 25px;
              justify-content: space-between;
              span {
                display: flex;
                align-items: center;
                i {
                  max-width: 70px;
                  @include ellipsis;
                }
                b {
                  font-weight: normal;
                  color: #8e8e8e;
                }
              }
              .v-c {
                width: 4px;
                height: 4px;
                display: inline-block;
                border-radius: 50%;
                background: #0086f8;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
