<template>
  <div class="app">
    <nav>
      <ul>
        <li
          v-for="(item, index) in title"
          :key="index"
          :class="{ active: index == currIndex }"
          @click="switchNav(index)"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
    <div class="heard">
      <cant></cant>
      <div class="fl">共 <i>130</i> 条订单</div>
    </div>
    <div class="content">
      <div class="content-d">
        <h5>
          <span>1小时2元钱</span>
          <span>已完成</span>
        </h5>
        <ul>
          <li>
            <span class="word"
              ><i class="word-3">订</i><i class="word-3">单</i>号：</span
            ><span>123456789789789</span>
          </li>
          <li>
            <span class="word"><i class="word-2">时</i>间：</span
            ><span>2019-06-21 10:23:22</span>
          </li>
          <li>
            <span class="word"><i>支付方式</i>：</span><span>钱包支付</span>
          </li>
          <li>
            <span class="word"><i>分成比例</i>：</span><span>2%</span>
          </li>
          <li>
            <span class="word"><i class="word-2">费</i>率：</span
            ><span>0.6% ( 0.32元 )</span>
          </li>
          <li>
            <span class="word"><i class="word-2">收</i>益：</span
            ><span>23.2</span>
          </li>
        </ul>
        <p>金额<span>￥10</span></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cant from "@/base/cant/cant";
export default {
  data() {
    return {
      title:['全部','已完成','已退款','部分退款','待运行'],
      currIndex:0
    }
  },
  components: {
     cant
  },
  methods:{
    switchNav(i) {
      this.currIndex=i
    }
  }
}
</script>

<style scoped lang="scss">
.app {
  @include bg-fixed(0, 0, $bgColor, 5);
  nav {
    background: #fff;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      li {
        padding: 32px 30px;
        font-weight: bold;
        font-size: 28px;
        &.router-link-active {
          border-bottom: 6px solid #0086f8;
          color: #0086f8;
          border-radius: 3px;
        }
      }
      .active {
        color: #0086f8;
        border-bottom: 6px solid #0086f8;
      }
    }
  }
  .heard {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 24px;
    justify-content: space-between;
    i {
      color: #2095f7;
    }
    .fl {
      font-size: 28px;
      i {
        font-size: 30px;
      }
    }
  }
  .content {
    background: #fff;
    .content-d {
      h5 {
        display: flex;
        justify-content: space-between;
        padding: 22px;
        border-bottom: 1px solid #efefef;
        font-size: 28px;
      }
      ul {
        border-bottom: 1px solid #efefef;
        li {
          padding: 22px;
          .word {
            padding-right: 20px;
          }
          .word-2 {
            letter-spacing: 2em;
          }
          .word-3 {
            letter-spacing: 0.5em;
          }
        }
      }
      p {
        padding: 22px;
        text-align: right;
      }
    }
  }
}
</style>
