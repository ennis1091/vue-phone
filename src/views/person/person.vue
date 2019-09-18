<template>
  <div class="page">
    <div class="bg">
      <div class="bg-m">
        <div class="header-ico">
          <img src="~@/common/img/tou.jpg" />
          <p>
            <span><b>葛文文</b><i class="bang">已绑定</i></span>
            <span>1231345646</span>
          </p>
        </div>
        <div class="right">
          <div>
            <i class="iconfont icon-log-out"></i>
            退出登录
          </div>
        </div>
      </div>
    </div>
    <ul>
      <router-link :to="{ name: 'information' }" tag="li">
        <span>
          <i class="iconfont icon-id-badge"></i>
          结算账户设置
        </span>
        <span class="sed">
          尚未绑定账户<i class="iconfont icon-forward"></i>
        </span>
      </router-link>
      <router-link :to="{ name: 'renewalCenter' }" tag="li">
        <span>
          <i class="iconfont icon-renew"></i>
          续费中心
        </span>
        <span class="sed">
          您有<b>1</b>台设备即将到期<i class="iconfont icon-forward"></i
        ></span>
      </router-link>
      <router-link :to="{ name: 'changetel' }" tag="li">
        <span>
          <i class="iconfont icon-phone-number"></i>
          手机号修改
        </span>
        <span class="sed">
          123456789<i class="iconfont icon-forward"></i>
        </span>
      </router-link>
      <router-link :to="{ name: 'notification' }" tag="li">
        <span>
          <i class="iconfont icon-notify"></i>
          系统通知
        </span>
        <span class="sed">
          文案阿文案啊问<i class="iconfont icon-forward"></i>
        </span>
      </router-link>
    </ul>
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
  methods: {
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.page {
  @include bg-fixed(0, 145px, $bgColor, 3);
  background: #fff;
  .bg {
    background: url('~@/common/img/bg-personal.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    height: 300px;
    box-sizing: border-box;
    .bg-m {
      position: absolute;
      top: 70px;
      width: 95%;
      left: 50%;
      transform: translate(-50%);
      background: url('~@/common/img/seg-personal.png') no-repeat;
      background-size: 100% 100%;
      padding: 60px 0;
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      box-shadow: #a0c3e0 0 0 20px;
      .header-ico {
        display: flex;
        flex-direction: row;
        padding-left: 50px;
        img {
          width: 130px;
          height: 130px;
          border: 6px solid #45b0ff;
          display: block;
          margin-right: 30px;
          border-radius: 50%;
          overflow: hidden;
          background: #eee;
        }
        p {
          display: flex;
          justify-content: center;
          text-align: left;
          flex-direction: column;
          color: #8e8e8e;
          span {
            padding: 10px 0;
            b {
              font-size: 44px;
              color: #333;
            }
            i {
              border-radius: 8px;
              box-sizing: border-box;
              margin-left: 10px;
              font-size: 20px;
              padding: 4px;
            }
            .bang {
              border: 1px solid #0086f8;
              color: #0086f8;
            }
            .w-bang {
              border: 1px solid #0086f8;
              background: #0086f8;
              color: #fff;
            }
          }
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-log-out {
          font-size: 22px !important;
        }
        div {
          padding: 16px;
          background: #289cfc;
          color: #fff;
          border-top-left-radius: 76px;
          border-bottom-left-radius: 76px;
          border: 1px solid #289cfc;
          box-sizing: border-box;
          box-shadow: #6aabe0 0 0 20px;
        }
      }
    }
  }
  ul {
    margin-top: 80px;
    background: #fff;
    font-size: 32px;
    color: #5c5c5c;
    li {
      padding: 30px;
      border-bottom: 1px solid $bgColor;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .icon-id-badge {
        color: #889afe;
      }
      .icon-renew {
        color: #faa031;
      }
      .icon-phone-number {
        color: #b281ff;
      }
      .icon-notify {
        color: #48aafc;
      }
      span {
        &:first-child {
          display: flex;
          align-items: center;
          i {
            padding-right: 10px;
          }
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
