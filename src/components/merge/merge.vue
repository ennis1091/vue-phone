<template>
  <div class="merge">
    <div class="out">
      <p>
        <span>1小时2块钱</span>
        <span>2019-06-21 10:23:22</span>
      </p>
      <ul>
        <li>
          <span> <i>订</i><i>单</i>号：</span>
          <span>
            1231456456465
          </span>
        </li>
        <li>
          <span>
            订单金额：
          </span>
          <span>
            10.55元
          </span>
        </li>
        <li>
          <span>分成比例：</span>
          <span>
            23%
          </span>
        </li>
        <li>
          <span><i class="letter2">应</i>收：</span>
          <span>
            23元
          </span>
        </li>
        <li>
          <span><i class="letter2">费</i>率：</span>
          <span>
            2.2%（扣除2.2元）
          </span>
        </li>
      </ul>
      <div>
        <span> 实收：<i>￥10</i> </span>
      </div>
    </div>
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
.merge {
  @include bg-fixed(0, 0, $bgColor, 5);
  .out {
    margin-top: 20px;
    background: #fff;
    p {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20px;
      border-bottom: 1px solid #f3f3f3;
      span {
        font-size: 30px;
        font-weight: bold;
        &:last-child {
          font-weight: normal;
          font-size: 26px;
          color: #5c5c5c;
        }
      }
    }
    ul {
      padding: 0 20px;
      border-bottom: 1px solid #f3f3f3;
      li {
        text-align: left;
        padding: 15px 0;
        span {
          &:first-child {
            color: #8e8e8e;
            flex: 1;
            i {
              letter-spacing: 0.5em;
            }
            .letter2 {
              letter-spacing: 2em;
            }
          }
          &:last-child {
            flex: 2;
          }
        }
      }
    }
    div {
      text-align: right;
      padding: 20px;
      i {
        color: #ff7e00;
      }
    }
  }
}
</style>
