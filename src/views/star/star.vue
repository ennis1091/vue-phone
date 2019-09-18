<template>
  <div class="page">
    <div class="heard">
      <div class="sum-money">
        <p>线上总收益（元）<i class="iconfont icon-tishi" @click="show"></i></p>
        <p class="b-word">$ 3332.0</p>
      </div>
      <div class="money-text">
        <p>
          <span>
            <i></i>
            已入账
          </span>
          <span class="b-word">
            $333.0
          </span>
        </p>
        <p class="line">
          <span>
            <i></i>
            在途中：<b class="b-word">$234.2</b>
          </span>
          <span>
            <i></i>
            未结算：<b class="b-word">$234.2</b>
          </span>
        </p>
      </div>
    </div>
    <div class="title">
      <div class="tit-l">
        <i class="border"></i>
        <p class="left">
          帐目明细
        </p>
        <span>
          共<i>2233</i>笔
        </span>
      </div>
      <div @click="toPage">
        查看更多>>
      </div>
    </div>
    <scroll class="list" :data="data">
      <ul id="uu">
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="orge">
              在途中
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <router-link to="/star/money" exact>
              222
            </router-link>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="~@/common/img/icon-selected-equipment.png" />
            <div>
              <span>123456789</span>
              <span class="time">2019-06-12 11:23:23</span>
            </div>
          </div>
          <div class="right">
            <span>
              +13.1
            </span>
            <span class="cole">
              已到账
            </span>
          </div>
        </li>
      </ul>
    </scroll>
    <!-- 使用动态的 transition name -->
    <transition name="slide-opacity">
      <router-view class="transitionBody"></router-view>
    </transition>
    <instructions :imgURL="imgURL" :text="text" v-show="on" @closed="closed">
      <ul class="alert-ul">
        <li>
          <div><i class="v-i"></i></div>
          <div>
            <span>M+1结算：</span>M月为交易月份，M月交易完成的订单将于次月结算。
          </div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div>
            <span>线上总收益：</span
            >包含订单（支付宝/微信/钱包）线上支付方式产生的收益。
          </div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div>
            <span>未结算总金额：</span
            >未达到结算周期（T+1，T+7等）的订单收益总计。
          </div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div><span>待转账总金额：</span>待转账账单金额总计。</div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div><span>已入账金额：</span>已入账总账单金额总计。</div>
        </li>
      </ul></instructions
    >
  </div>
</template>

<script type="text/ecmascript-6">
import instructions from '@/base/instructions/instructions'
export default {
  data() {
    return {
      data:[],
      imgURL:require('@/common/img/bg-settlement.png'),
      text:'我知道了',
      on:0,
      transitionName:''
    }
  },
  mounted () {
  window.addEventListener('scroll', this.handleScroll, true)
  },
  methods:{
    toPage() {
      this.$router.push({name:'more'})
    },
    show() {
      this.on=1
    },
    closed() {
      this.on=0
    }
  },
  beforeRouteLeave(to,from,next){
    window.removeEventListener('scroll', this.addEventScrollTop ,true);
    next();// next()记得写不然不跳转
},
  components: {
    instructions
  }
}
</script>

<style scoped lang="scss">
.page {
  @include bg-fixed(0, 145px, $bgColor, 3);

  .heard {
    background: url('~@/common/img/bg-Receivables.png');
    background-size: cover;
    color: #edf7ff;
    padding: 40px;
    height: 450px;
    box-sizing: border-box;
    font-size: 32px;
    .b-word {
      font-weight: bold;
    }
  }
  .sum-money {
    text-align: left;
    padding-bottom: 60px;
    p {
      padding-bottom: 10px;
      &:last-child {
        font-size: 80px;
      }
    }
    .icon-tishi {
      font-size: 25px;
    }
  }
  .money-text {
    display: flex;
    justify-content: flex-start;

    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      width: 30%;
      padding-right: 5%;
      &:last-child {
        flex: 1;
      }
      span {
        padding: 10px 0;
      }
    }
  }
  .line {
    border-left: 1px solid #76cafd;
    padding: 10px 40px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: #fff;
    height: 80px;
    box-sizing: border-box;
    padding: 18px 20px;
    border-bottom: 1px solid $bgColor;
    .tit-l {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .border {
        width: 8px;
        display: inline-block;
        height: 40px;
        background: #0086f8;
        margin-right: 16px;
      }
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 40px;
        font-size: 32px;
        font-weight: bold;
      }
      span {
        font-weight: normal;
        font-size: 24px;
        padding-left: 20px;
        color: #bbb;
        i {
          color: #0086f8;
        }
      }
    }
  }
  .list {
    overflow: hidden;
    @include bg-fixed(530px, 145px, #fff, 4);
    ul {
      padding-bottom: 20px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #f3f3f3;
        .left {
          display: flex;
          flex-direction: row;
          img {
            width: 70px;
            height: 70px;
            padding-right: 30px;
          }
          div {
            display: flex;
            flex-direction: column;
            text-align: left;
            justify-content: center;
            span {
              padding: 4px 0;
              &:first-child {
                font-size: 30px;
              }
            }
            .time {
              color: #8e8e8e;
            }
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          text-align: right;
          span {
            padding: 4px 0;
            &:first-child {
              font-size: 36px;
            }
          }
          .cole {
            color: #8e8e8e;
          }
          .orge {
            color: #f88400;
          }
        }
      }
    }
  }
  .problem {
    @include bg-fixed(0, 0, rgba(0, 0, 0, 0.3), 7);
    justify-content: center;
    align-items: center;
    display: flex;
    .out {
      background: #fff;
      padding: 25px;
      border-radius: 10px;
      width: 80%;
      h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        padding: 20px 0;
        span {
          padding: 0 10px;
        }
        i {
          margin: 0 8px;
        }
        .v-sml {
          width: 6px;
          height: 6px;
          background: #0086f8;
          border-radius: 50%;
        }
        .v-big {
          width: 8px;
          height: 8px;
          background: #0086f8;
          border-radius: 50%;
        }
      }
      ul {
        text-align: left;
        font-size: 25px;
        color: #4d4d4d;
        border-bottom: 1px solid #d1e9fe;
        li {
          padding-bottom: 30px;
          display: flex;
          align-items: flex-start;
          div {
            &:first-child {
              color: #909090;
              word-break: keep-all;
              white-space: nowrap;
              display: flex;
              align-items: center;
            }
            .v-i {
              display: inline-block;
              width: 6px;
              height: 6px;
              background: #4d4d4d;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
        }
      }
      button {
        border: none;
        background: #fff;
        color: #0086f8;
        font-size: 28px;
        font-weight: bold;
        padding-top: 20px;
      }
    }
  }
}
</style>
