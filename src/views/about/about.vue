<template>
  <div class="about">
    <div class="v-cart">
      <ve-ring
        :data="chartData"
        :settings="chartSettings"
        :legend-visible="false"
        :colors="['#14c5db', '#5971fd']"
        class="v-ring"
      ></ve-ring>
      <div class="chart-text">
        <div>
          <p><span class="online"></span>在线设备</p>
          <p class="num">55%</p>
        </div>
        <div>
          <p><span class="offline"></span>离线设备</p>
          <p class="num">45%</p>
        </div>
      </div>
    </div>
    <div class="v-bot">
      <ul>
        <router-link tag="li" :to="{ name: 'equipment' }">
          <span class="ico">
            <img src="~@/common/img/icon-selected-equipment.png" />
            所有设备
          </span>
          <span class="sed"> 一台<i class="iconfont icon-forward"></i> </span>
        </router-link>
        <li>
          <span class="ico">
            <img src="~@/common/img/icon-On-line.png" />
            在线设备
          </span>
          <span class="sed"> 一台<i class="iconfont icon-forward"></i></span>
        </li>
        <li>
          <span class="ico">
            <img src="~@/common/img/icon-Line.png" />
            离线设备
          </span>
          <span class="sed"> 一台<i class="iconfont icon-forward"></i> </span>
        </li>
      </ul>
      <ul>
        <router-link tag="li" :to="{ name: 'fault' }">
          <span class="ico">
            <img src="~@/common/img/icon-malfunction.png" />
            故障警告
          </span>
          <span class="sed"> 一台<i class="iconfont icon-forward"></i> </span>
        </router-link>
        <router-link tag="li" :to="{ name: 'transfer' }">
          <span class="ico">
            <img src="~@/common/img/icon- make-over.png" />
            设备转让
          </span>
        </router-link>
      </ul>
    </div>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import VeRing from 'v-charts/lib/ring.common'
  export default {
    created(){

    },
    data () {
      this.chartSettings = {
        radius: [30, 70],
        roseType: 'radius',
        label:{
          show:false
        },
        dataType:'percent'
      }
      return {
        chartData: {
          columns: ['设备', '数量'],
          rows: [
            { '设备': '在线设备', '数量': 55 },
            { '设备': '离线设备', '数量': 45 }
          ]
        }
      }
    },
  methods: {
  },
  components: {
    VeRing
  }
  }
</script>

<style scoped lang="scss">
.about {
  @include bg-fixed(0, 145px, $bgColor, 3);
  .v-cart {
    position: relative;
    width: 100%;
    height: 200px;
    background: #fff;
    overflow: hidden;
    .v-ring {
      position: absolute;
      top: -100px;
      left: -15%;
    }
    .chart-text {
      position: absolute;
      top: 0;
      right: 15%;
      height: 100%;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        padding: 12px 0;
      }
      span {
        display: inline-block;
      }
      .online,
      .offline {
        width: 12px;
        height: 12px;
        background: #14c5db;
        border-radius: 2px;
        margin-right: 5px;
        color: #8e8e8e;
      }
      .offline {
        background: #5971fd;
      }
      .num {
        text-align: left;
        padding-left: 17px;
        padding-top: 5px;
        font-weight: bold;
      }
    }
  }
  .v-bot {
    position: absolute;
    top: 200px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
  }
  ul {
    margin-top: 40px;
    background: #fff;
    font-size: 32px;
    color: #5c5c5c;
    li {
      padding: 30px;
      border-bottom: 2px solid $bgColor;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .ico {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 36px;
          margin-right: 20px;
        }
      }

      .sed {
        color: #8e8e8e;
        font-size: 28px;
        i {
          padding-left: 16px;
        }
      }
    }
  }
}
</style>
