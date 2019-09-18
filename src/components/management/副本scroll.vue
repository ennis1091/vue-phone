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
    <div ref="wrapper" class="product-list">
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
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { reqList } from '@/api'
const TIME_BOUNCE = 800
const TIME_STOP = 600
const THRESHOLD = 70
const STOP = 56
export default {
   created() {
      this.bscroll = null
    },
  mounted() {
    this.getPage()
    this.$nextTick(() => {
       this.initBscroll()
    })

    },
  data() {
    return {
      data:[],
      payload:{
        page:1,
        pageSize:10
      },
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      endword:'Loading...'
    }
  },
  methods:{
    initBscroll() {
       this.bscroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          pullUpLoad: {
            threshold: 50
          },
          bounceTime: TIME_BOUNCE,
          pullDownRefresh: {
            threshold: THRESHOLD,
            stop: STOP
          },
          useTransition:false  // 防止iphone微信滑动卡顿
        })
        this.bscroll.on('pullingUp', this.pullingUpHandler)
        this.bscroll.on('pullingDown', this.pullingDownHandler)
        this.bscroll.on('scroll', this.scrollHandler)
    },
    async pullingUpHandler() {
        this.isPullUpLoad = true
        await this.getPage()
        this.bscroll.refresh()
        this.isPullUpLoad = false
      },
    async getPage() {
       try {
         const result = await reqList(this.payload.page,this.payload.pageSize)
         if (result.code === 0) {
            const newdata = result.data
            this.data=this.data.concat(newdata)
            ++this.payload.page
              console.log(this.payload.page)
            if (this.payload.page>20) {
              this.bscroll.closePullUp()
              this.endword='没有更多数据'
            }else{
                 this.bscroll.finishPullUp()
            }
            // if (newdata.length-1 <this.payload.pageSize) {
            //   this.bscroll.closePullUp()
            //   this.endword='没有更多数据'
            // }
          } else {
            console.log(result)
          }

       } catch (err) {
         console.log(err)
       }
    },
    scrollHandler(pos) {
      // console.log(pos.y)
    },
    async pullingDownHandler() {
      this.beforePullDown = false
      this.isPullingDown = true
      // STEP += 10
      this.payload.page=1,
      await this.requestData()
      this.isPullingDown = false
      this.finishPullDown()
    },
    async finishPullDown() {
      const stopTime = TIME_STOP
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown()
          resolve()
        }, stopTime)
      })
      setTimeout(() => {
        this.beforePullDown = true
        this.bscroll.refresh()
      }, TIME_BOUNCE)
    },
    async requestData() {
      try {
        const result = await reqList(this.payload.page,this.payload.pageSize)
        if (result.code === 0) {
            const newdata = result.data
            this.data=newdata
            ++this.payload.page
            console.log(this.payload.page)

            if (newdata.length<this.payload.pageSize) {
              this.bscroll.closePullUp()
              this.endword='没有更多数据'
            }else{
              // this.bscroll.openPullUp()
              this.endword='Load...'
            }

          } else {
            console.log(result)
          }

      } catch (err) {
        // handle err
        console.log(err)
      }
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
.pullup-wrapper {
  padding: 20px;
  text-align: center;
  color: #999;
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
</style>
