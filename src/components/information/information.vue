<template>
  <div class="infor">
    <router-link tag="p" :to="{ name: 'verifyphone' }">
      <span><img v-lazy="require('@/common/img/wcart.png')" alt="" />微信</span>
      <span>未绑定<i class="iconfont icon-xiangqian"></i></span>
    </router-link>
    <router-link tag="p" :to="{ name: 'verifyphone' }">
      <span><img v-lazy="require('@/common/img/zfb.png')" alt="" />支付宝</span>
      <span>未绑定<i class="iconfont icon-xiangqian"></i></span>
    </router-link>
    <router-link tag="p" :to="{ name: 'settlement' }" class="la-p">
      <span
        ><img v-lazy="require('@/common/img/jie.png')" alt="" />结算方式</span
      >
      <span>未结算<i class="iconfont icon-xiangqian"></i></span>
    </router-link>
    <button>保存</button>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        settype:''
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.infor {
  @include bg-fixed(0, 0, $bgColor, 5);
  padding-top: 20px;
  .la-p {
    margin-top: 10px;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    background: #fff;

    span {
      align-items: center;
      display: flex;
      &:last-child {
        color: #a5a5a5;
      }
    }
    img {
      width: 40px;
      height: 40px;
      padding-right: 10px;
    }
  }
  button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    border: none;
    background: #0086f8;
    color: #fff;
    font-weight: bold;
    padding: 28px 0;
    border-radius: 10px;
    font-size: 30px;
  }
}
</style>
