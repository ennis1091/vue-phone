<template>
  <div class="page">
    <div class="heard">
      <div class="heard-ico">
        <img src="~@/common/img/tou.jpg" />
        <div class="heard-name">
          <div>
            <p>葛文文</p>
            <p class="tel">1233456465</p>
          </div>
        </div>
      </div>
      <div class="heard-bottom">
        <p>
          <span><i>¥</i>2323</span>
          <span>今日营业额</span>
        </p>
        <span class="line"></span>
        <p>
          <span>2323<i>次</i></span>
          <span>今日订单量</span>
        </p>
      </div>
    </div>
    <div class="list-ul">
      <h3>项目管理</h3>
      <ul>
        <router-link tag="li" to="/home/management">
          <img src="~@/common/img/icon-product.png" />
          <div>
            <span>产品管理</span>
            <span>产品添加及修改属性</span>
          </div>
        </router-link>
        <router-link tag="li" to="/home/order">
          <img src="~@/common/img/icon-Order.png" />
          <div>
            <span>订单管理</span>
            <span>查看筛选所有订单状态</span>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="list-ul">
      <h3>资金报表</h3>
      <ul>
        <router-link tag="li" to="/home/turnover">
          <img src="~@/common/img/icon-Turnover.png" />
          <div>
            <span>营业额报表</span>
            <span>总营业额：<i>$2322</i></span>
          </div>
        </router-link>
        <router-link tag="li" to="/home/earnings">
          <img src="~@/common/img/icon-Profit.png" />
          <div>
            <span>收益报表</span>
            <span>总收益：<i>$2322</i> </span>
          </div>
        </router-link>
      </ul>
    </div>
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    console.log(55)
  },
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.page {
  @include bg-fixed(0, 145px, $bgColor, 3);
  text-align: left;
  .heard {
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 2px solid #eee;
    margin-bottom: 20px;
    background: url(~@/common/img/bg-Business.png);
    background-size: cover;
    .heard-ico {
      display: flex;
      padding-top: 20px;
      padding-bottom: 20px;
      img {
        width: 110px;
        height: 110px;
        border: 6px solid #45b0ff;
        display: block;
        margin-right: 30px;
        border-radius: 50%;
        overflow: hidden;
        background: #eee;
      }
    }
    .heard-name {
      display: flex;
      align-items: center; /*垂直居中*/
      color: #fff;
      font-size: 35px;
      p {
        padding: 4px 0;
        &:nth-last-of-type(1) {
          color: #bbe1ff;
        }
      }
      .tel {
        font-size: 30px;
      }
    }
    .heard-bottom {
      background: #fff;
      border-radius: 10px;
      padding: 40px 80px;
      color: #1694fa;
      font-weight: bold;
      font-size: 40px;
      display: flex;
      justify-content: space-between;
      p {
        flex-direction: column;
        display: flex;
        span {
          i {
            font-size: 24px;
          }
          &:nth-last-of-type(1) {
            font-size: 24px;
            font-weight: normal;
            padding-top: 16px;
          }
        }
      }
      .line {
        border: 1px solid #e5f3fe;
      }
    }
  }
  .list-ul {
    margin-top: 20px;
    background: #fff;
    h3 {
      padding: 20px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        padding: 45px 20px;
        width: 100%;
        border: 2px solid #eee;
        align-items: center; /*垂直居中*/
        img {
          padding-right: 10px;
          width: 68px;
          height: 68px;
        }
        div {
          display: flex;
          flex-direction: column;
          margin-top: -30px;
          span {
            color: #9d9d9d;
            &:first-child {
              color: #333;
              font-weight: bold;
              font-size: 28px;
              line-height: 60px;
            }
            i {
              color: #f88400;
            }
          }
        }
        &:first-child {
          border-right: 0;
        }
      }
    }
  }
}
</style>
