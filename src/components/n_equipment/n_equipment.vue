<template>
  <div class="equipment">
    <header>
      <i class="iconfont icon-place"></i>
      <div class="search">
        <input type="text" placeholder="请输入设备名称" />
        <i class="iconfont icon-search"></i>
      </div>
      <div class="ico-r" :class="{ 'ico-r-active': on }" @click="showSelect">
        <span>筛选</span>
        <i class="iconfont icon-xiala"></i>
      </div>
    </header>
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
            :to="{ name: 'details', params: { type: item.name } }"
            tag="li"
            v-for="(item, index) in data"
            :key="index"
          >
            <h5>
              <span>产品名称</span
              ><span
                ><b>在线</b><img src="@/common/img/on-line.png" alt=""
              /></span>
            </h5>
            <div class="content">
              <img v-lazy="" alt="" />
              <p>
                <span>
                  产品编号：868866688868
                </span>
                <span>
                  到期时间：2019-06-27
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
    <div class="map-btn">
      <span @click="toMap"><i></i>查看地图</span>
      <span><i></i>添加设备</span>
    </div>
    <div class="select" v-show="on">
      <ul>
        <li>
          <h3>设备在离线</h3>
          <div>
            <span
              v-for="(item, index) in select_1"
              :key="index"
              :class="{ secectBackground: flag_1 == index }"
              @click.stop="bgChange1(index)"
              >{{ item.name }}</span
            >
          </div>
        </li>
        <li>
          <h3>设备状态</h3>
          <div>
            <span
              v-for="(item, index) in select_2"
              :key="index"
              :class="{ secectBackground: flag_2 == index }"
              @click.stop="bgChange2(index)"
              >{{ item.name }}</span
            >
          </div>
        </li>
        <li>
          <h3>设备类型</h3>
          <div>
            <span
              v-for="(item, index) in select_3"
              :key="index"
              :class="{ secectBackground: flag_3 == index }"
              @click.stop="bgChange3(index)"
              >{{ item.name }}</span
            >
          </div>
        </li>
      </ul>
      <div class="btn">
        <button @click.stop="closed">取消</button>
        <button class="submit" @click.stop="submit">确认</button>
      </div>
    </div>
    <router-view></router-view>
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
      on:false,
      touchMore:false,
      select_1:[
        {name:'全部',id:1},
        {name:'在线',id:2},
        {name:'离线',id:3}
      ],
      select_2:[
        {name:'全部',id:4},
        {name:'启用',id:5},
        {name:'停用',id:6}
      ],
      select_3:[
        {name:'全部',id:7},
        {name:'慢充设备，可退款',id:8}
      ],
      flag_1:0,
      flag_2:0,
      flag_3:0
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
    bgChange1(index) {
      this.flag_1=index
    },
    bgChange2(index) {
      this.flag_2=index
    },
    bgChange3(index) {
      this.flag_3=index
    },
    showSelect() {
      this.on=!this.on
    },
    closed(){
      this.on=false
    },
    submit() {
      this.on=false
    },
    toMap() {
      this.$router.push({name:'map'})
    }
  }
}
</script>

<style scoped lang="scss">
.equipment {
  @include bg-fixed(0, 0, $bgColor, 5);
  header {
    display: flex;
    height: 100px;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    margin-bottom: 20px;
    .icon-place {
      padding: 26px;
      font-size: 24px;
    }
    .search {
      display: flex;
      flex: 1;
      padding: 25px;
      background: $bgColor;
      border-radius: 10px;
      input {
        border: none;
        flex: 1;
        background: $bgColor;
      }
      .icon-search {
        font-size: 26px;
      }
    }
    .ico-r {
      padding: 22px;
      span {
        padding-right: 10px;
      }
    }
    .ico-r-active {
      color: #0086f8;
    }
  }
  .list {
    @include bg-fixed(120px, 120px, $bgColor, 5);
    overflow-y: hidden;
    li {
      background: #fff;
      margin-bottom: 10px;
      h5 {
        display: flex;
        justify-content: space-between;
        padding: 28px 24px;
        border-bottom: 1px solid $bgColor;
        span {
          &:first-child {
            font-size: 28px;
          }
        }
        b {
          padding: 4px 16px;
          border-right: 1px solid $bgColor;
        }
        img {
          width: 29px;
          height: 22px;
          padding-left: 16px;
        }
      }
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 28px 24px;
        img {
          width: 94px;
          height: 94px;
        }
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          span {
            text-align: left;
            padding: 15px 36px;
          }
        }
      }
    }
  }
  .map-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120px;
    background: #fff;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.1);
    z-index: 8;
    padding: 20px;
    box-sizing: border-box;
    span {
      background: #0086f8;
      background: linear-gradient(#65b8ff, #0689f9);
      color: #fff;
      width: 45%;
      height: 100%;
      border-radius: 10px;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .select {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 102px;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 6;
    ul {
      background: #fff;
      li {
        padding: 30px 24px;
        h3 {
          text-align: left;
        }
        div {
          display: flex;
          justify-content: space-between;
          padding-top: 28px;
          span {
            padding: 18px 66px;
            background: $bgColor;
            border-radius: 10px;
          }
          .secectBackground {
            background: #0086f8;
            color: #fff;
          }
        }
      }
    }
    .btn {
      background: #fff;
      display: flex;
      border-top: 1px solid #cce7fe;
      button {
        padding: 30px 0;
        border: none;
        flex: 1;
        background: #fff;
        color: #0086f8;
      }
      .submit {
        background: #0086f8;
        color: #fff;
      }
    }
  }
}
</style>
