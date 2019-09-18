<template>
  <scroll
    class="v-listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li
        v-for="(group, index) in data"
        class="v-group"
        ref="listGroup"
        :key="index"
      >
        <h2 class="v-group-title">{{ group.title }}</h2>
        <ul>
          <li
            @click="selectItem(item)"
            v-for="(item, index) in group.items"
            class="v-group-item"
            :key="index"
          >
            <!-- <img class="avatar" v-lazy="item.avatar" /> -->
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="v-shortcut"
      @touchstart.stop.prevent="onShortTouchStart"
      @touchmove.stop.prevent="onShortTouchMove"
      @touchend.stop.prevent="onShortTouchEnd"
      ref="shortcut"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          class="item"
          :class="{ current: currentIndex == index }"
          :data-index="index"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- <div class="v-fixed" ref="fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>  //吸顶 下方diff和watch计算 
    </div> -->
    <div class="v-title" v-show="crice">{{ fixedTitle }}</div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import {getData} from '@/common/js/dom'
const antouch_height = 18
const TITLE_HEIGHT  = 30
export default {
   created() {
    this.touch = {}
    this.listenScroll=true  //创建全局属性
    this.listHeight=[]
    this.probeType=3
  },
  props: {
    data: {
      type : Array,
       default:() => []        //[{'items':[{'name':'杭州'},{'name':'杭州'}],'title':'A'},{'items':[{'name':'北京'},{'name':'杭州'}],'title':'B'}]
    }
  },
  data() {
    return {
      scrollY:-1,
      currentIndex:0,
      diff: -1,
      crice:false  //圆形 中央字
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0,1)
      })
    },
    fixedTitle() {
       if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select',item)
    },
    onShortTouchStart (e) {
      let anIndex = getData(e.target,'index')
      this.$refs.shortcut.style.background = 'rgb(246, 246, 246)'
      let firstTouch = e.touches[0]
      this.touch.y1= firstTouch.pageY
      this.touch.anIndex=anIndex
      this._scrollTo(anIndex)
      this.crice=true
    },
    onShortTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2= firstTouch.pageY
      let delta = (this.touch.y2-this.touch.y1) / antouch_height | 0
      let anIndex=parseInt(this.touch.anIndex) + parseInt(delta)
       console.log(anIndex)
      this._scrollTo(anIndex)
    },
    onShortTouchEnd() {
      this.$refs.shortcut.style.background = 'rgba(0, 0, 0,0)'
      this.crice=false
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      this.scrollY=pos.y
    },
    _scrollTo(index) {
      if (!index && index!==0) {
        return
      }
      if (index<0) {
        index=0
      }else if(index>this.listHeight.length-2){
        index = this.listHeight.length-2
      }
      this.scrollY=-this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 20)
    },
    _calculateHeight() {
        this.listHeight=[]
        const list =this.$refs.listGroup
        let height=0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item=list[i]
          height+=item.clientHeight
          this.listHeight.push(height)
        }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      },20)
    },
    scrollY(newY) {
       const listHeight = this.listHeight
       // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
     }
    // diff(newVal) {
    //     let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
    //     if (this.fixedTop === fixedTop) {
    //       return
    //     }
    //     this.fixedTop = fixedTop
    //     this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    //   }
  }
}
</script>

<style scoped lang="scss">
.v-listview {
  position: fixed;
  width: 100%;
  top: 70px;
  bottom: 0;
  overflow: hidden;
  background: #fff;
}
.v-listview .v-group {
  padding-bottom: 30px;
}
.v-listview .v-group .v-group-title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #747474;
  background: #f5f5f5;
  text-align: left;
}
.v-listview .v-group .v-group-item {
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  align-items: center;
  padding: 10px 0;
}
.v-listview .v-group .v-group-item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.v-listview .v-group .v-group-item .name {
  margin-left: 20px;
  color: #747474;
  font-size: 14px;
}
.v-listview .v-shortcut {
  position: absolute;
  z-index: 30;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 10px 0;
  border-radius: 2px;
  text-align: center;
  font-family: Helvetica;
}
.v-listview .v-shortcut .item {
  padding: 3px;
  line-height: 1;
  color: #508af6;
  font-size: 12px;
}
.v-listview .v-shortcut .item.current {
  color: #f80;
}
.v-listview .v-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.v-listview .v-fixed .fixed-title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #a3a3a3;
  background: #f5f5f5;
  text-align: left;
}
.v-listview .loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.v-title {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 30;
  right: 0;
  top: 40%;
  left: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-weight: bold;
  transform: translate(-50%, -50%);
}
</style>
