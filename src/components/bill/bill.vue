<template>
  <div class="bill">
    <div class="bg">
      <div class="tou">
        <h3>
          <span><i></i>在途中</span>
          <span>+1020.23</span>
          <span>收款账户未实名</span>
        </h3>
        <ul>
          <li>
            <span>转账方式：</span>
            <span>系统自动转</span>
          </li>
          <li>
            <span>转账账户：</span>
            <span>1564566654656(支付宝)</span>
          </li>
          <li>
            <span>创建时间：</span>
            <span>2019-06-21 10:00:20</span>
          </li>
          <li>
            <span>付款时间：</span>
            <span>2019-06-21 10:00:20</span>
          </li>
          <li>
            <span><i>订</i><i>单</i>号：</span>
            <span>15616516156156</span>
          </li>
          <li>
            <span><i class="letter2">说</i>明：</span>
            <span>请及时将收款账户实名或重新绑定收款其他实名账户</span>
          </li>
        </ul>
      </div>
      <router-link tag="div" class="bot" :to="{ name: 'merge' }">
        <span>合并订单转账</span>
        <span>3笔 <i class="iconfont icon-xiangqian"></i></span>
      </router-link>
    </div>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.bill {
  @include bg-fixed(0, 0, $bgColor, 5);
  .bg {
    margin-top: 20px;
  }
  .tou {
    padding: 0 20px;
    background: #fff;
  }
  h3 {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 50px 0;
    border-bottom: 1px solid #f3f3f3;
    span {
      padding: 15px;
      &:first-child {
        font-size: 28px;
        color: #5c5c5c;
      }
      &:nth-of-type(2) {
        font-size: 58px;
      }
      &:last-child {
        font-size: 28px;
        color: #8e8e8e;
      }
    }
  }
  ul {
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px 0;
      font-size: 26px;
      span {
        &:first-child {
          flex: 1;
          text-align: left;
          i {
            letter-spacing: 0.5em;
          }
          .letter2 {
            letter-spacing: 2em;
          }
        }
        &:last-child {
          flex: 1;
          text-align: right;
        }
      }
      &:last-child {
        span {
          &:last-child {
            text-align: left;
          }
        }
      }
    }
  }
  .bot {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-top: 10px;
    span {
      &:last-child {
        color: #55aefa;
        i {
          color: #dcdcdc;
        }
      }
    }
  }
}
</style>
