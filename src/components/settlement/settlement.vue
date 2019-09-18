<template>
  <div class="settlement">
    <div class="bd-t">
      <h3>
        <i></i>
        请选择一种结算方式
      </h3>
      <div>
        <p @click="blue($event)">
          <span :class="{ active: index == 0 }">
            不结算
          </span>
          <span :class="{ active: index == 1 }">
            实时结算
          </span>
        </p>
        <p @click="blue($event)">
          <span :class="{ active: index == 2 }">
            T+n结算
          </span>
          <span :class="{ active: index == 3 }">
            M+1结算
          </span>
        </p>
      </div>
    </div>
    <div class="bd-m">
      <h3>
        <i></i>
        结算说明
      </h3>
      <ul>
        <li>
          <span><i class="v-c"></i><b>不</b><b>结</b>算：</span>
          <span>不进行结算转账处理;</span>
        </li>
        <li>
          <span><i class="v-c"></i>实时结算：</span>
          <span>
            系统自动进行结算转账处理;
          </span>
        </li>
        <li>
          <span><i class="v-c"></i>T+1 结算：</span>
          <span>T日为交易日（含节假日），T日交易完成的订单将于一天后结算;</span>
        </li>
        <li>
          <span><i class="v-c"></i>T+7 结算： </span>
          <span>
            T日为交易日（含节假日），T日交易完成的订单 将于下周一凌晨结算;
          </span>
        </li>
        <li>
          <span><i class="v-c"></i>M+1结算：</span>
          <span>
            M月为交易月份，M月交易完成的订单将于次月 结算;
          </span>
        </li>
      </ul>
      <p>
        为满足最低结算金额（￥1.00）或未结算订单将顺延至下一结算周期（含节假日）
      </p>
    </div>
    <div class="btn">
      <button @click="sub">
        确定
      </button>
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
        index:0
    }
  },
  methods:{
      blue(e) {
          let html=e.target.innerHTML.trim()
         if (html=='不结算') {
             this.index=0
         }else if (html=='实时结算') {
             this.index=1
         }else if(html=='T+n结算'){
             this.index=2
         }else if(html=='M+1结算'){
             this.index=3
         }
      },
      sub() {
          this.$router.push({name:'information'})
      }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.settlement {
  @include bg-fixed(0, 0, $bgColor, 5);
  overflow-y: scroll;
  .bd-t {
    margin-top: 20px;
    background: #fff;
    margin-bottom: 10px;
    h3 {
      display: flex;
      text-align: left;
      align-items: center;
      font-size: 24px;
      padding: 30px 20px;
      i {
        width: 6px;
        border-radius: 3px;
        height: 30px;
        margin-right: 20px;
        background: #0086f8;
      }
    }
    div {
      display: flex;
      flex-direction: column;
      p {
        display: flex;
        justify-content: space-between;
        padding: 0 20px 32px 20px;
        span {
          width: 45%;
          background: #f3f3f3;
          padding: 25px 0;
          border-radius: 10px;
          color: #8e8e8e;
        }
        .active {
          background: #0086f8;
          color: #fff;
        }
      }
    }
  }
  .bd-m {
    background: #fff;
    h3 {
      display: flex;
      text-align: left;
      align-items: center;
      font-size: 24px;
      padding: 30px 20px;
      i {
        width: 6px;
        border-radius: 3px;
        height: 30px;
        margin-right: 20px;
        background: #0086f8;
      }
    }
    ul {
      li {
        display: flex;
        text-align: left;
        align-items: flex-start;
        padding: 20px;
        b {
          letter-spacing: 0.5em;
        }
        span {
          flex: 1;
          &:first-child {
            color: #8e8e8e;
            display: flex;
            align-items: center;
            i {
              margin: 0 20px;
            }
          }
          .v-c {
            display: inline-block;
            background: #8e8e8e;
            width: 4px;
            height: 4px;
            border-radius: 50%;
          }
          &:last-child {
            flex: 3;
          }
        }
      }
    }
    p {
      color: #8e8e8e;
      padding: 30px;
      text-align: left;
    }
  }
  .btn {
    background: #fff;
    padding: 40px 0;
    button {
      border: none;
      background: #0086f8;
      width: 90%;
      color: #fff;
      padding: 30px;
      font-weight: bold;
      border-radius: 10px;
    }
  }
}
</style>
