<template>
  <div class="fault">
    <header class="v-hd">
      <span>
        <i></i>
        <b>统计饼图</b>
      </span>
      <cant></cant>
    </header>
    <div class="v-bing">
      <ve-ring
        :data="chartData"
        :settings="chartSettings"
        :legend-visible="false"
        :colors="[
          '#508af6',
          '#9250f6',
          '#50d1f6',
          '#5971fd',
          '#d550f6',
          '#5af5a3'
        ]"
        class="v-ring"
      ></ve-ring>
    </div>
    <div class="list-num v-num">
      <ul>
        <router-link
          :to="{ name: 'types', params: { type: item.name } }"
          tag="li"
          v-for="(item, index) in list"
          :key="index"
        >
          <span>{{ item.name }}<i></i></span>
          <span class="num"
            ><b>{{ item.num }}</b
            ><i class="iconfont icon-xiangqian"></i
          ></span>
        </router-link>
      </ul>
    </div>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import cant from '@/base/cant/cant'
import VeRing from 'v-charts/lib/ring.common'
export default {
  data() {
       this.chartSettings = {
        radius: [35, 70],
        dimension: '详情',
        metrics: '访问用户'
      }
    return {
        chartData: {
          columns: ['详情', '访问用户'],
          rows: [
            { '详情': '故障类型1', '访问用户': 1393 },
            { '详情': '故障类型2', '访问用户': 3530 },
            { '详情': '故障类型3', '访问用户': 2923 },
            { '详情': '故障类型4', '访问用户': 1723 },
            { '详情': '故障类型5', '访问用户': 3792 },
            { '详情': '故障类型6', '访问用户': 4593 }
          ]
        },
        list:[
          {
            name:'故障这这这这这这这这这这这这这这这重中之重做好1',
            num:'12'
          },
          {
            name:'故障详情2',
            num:'12'
          },
          {
            name:'故障详情3',
            num:'12'
          },
          {
            name:'故障详情4',
            num:'12'
          },
          {
            name:'故障详情5',
            num:'12'
          },
          {
            name:'故障详情6',
            num:'12'
          }
        ]
    }
  },
  components: {
        cant,
        VeRing
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.fault {
  @include bg-fixed(0, 0, $bgColor, 5);
  .v-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 25px;
    height: 42px;
    background: #fff;
  }
  .v-bing {
    position: relative;
    width: 100%;
    height: 230px;
    background: #fff;
    overflow: hidden;
    .v-ring {
      position: absolute;
      top: -95px;
    }
  }
  .v-num {
    position: absolute;
    width: 100%;
    top: 300px;
    bottom: 0px;
    overflow-y: scroll;
  }
  .list-num {
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 25px;
        border-bottom: 1px solid $bgColor;
        span {
          &:first-child {
            @include ellipsis;
          }
        }
        .num {
          color: #8e8e8e;
          b {
            padding: 0 30px;
            font-weight: normal;
          }
          i {
            font-size: 30px;
            color: #dcdcdc;
          }
        }
      }
    }
  }
}
</style>
