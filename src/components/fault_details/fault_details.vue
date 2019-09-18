<template>
  <div class="details">
    <ul>
      <li>
        <h3>
          <span>
            设备名称
          </span>
          <span>
            <i></i>
            故障类型
          </span>
        </h3>
        <div class="middle">
          <p>
            <span>设备编号：</span>
            <span>2546456455</span>
          </p>
          <p>
            <span>故障时间：</span>
            <span>2019-06-24 10:22:23</span>
          </p>
          <p>
            <span>故障说明：</span>
            <span
              >换算到哈市将抗老化的金卡蝴蝶结卡回到家可拉伸到拉萨接口对接奥斯卡</span
            >
          </p>
        </div>
        <div class="footer">
          <span class="map">
            <i></i>
            <span>浙江省杭州市滨江区西陵路</span>
          </span>
          <div>
            <span class="btn">
              到这去
              <i></i>
            </span>
          </div>
        </div>
      </li>
    </ul>
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
.details {
  @include bg-fixed(0, 0, $bgColor, 5);
  ul {
    margin-top: 20px;
    li {
      background: #fff;
      margin-bottom: 10px;
      h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        font-size: 28px;
        border-bottom: 1px solid $bgColor;
      }
      .middle {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 25px;
        border-bottom: 1px solid $bgColor;
        p {
          padding: 10px 0;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        padding: 25px;
        align-items: center;
        div {
          padding-left: 20px;
          border-left: 1px solid $bgColor;
          display: flex;
          .map {
            color: #8e8e8e;
          }
          .btn {
            color: #fff;
            background: #0086f8;
            padding: 12px 30px;
            border-radius: 30px;
          }
        }
      }
    }
  }
}
</style>
