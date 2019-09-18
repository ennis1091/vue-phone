<template>
  <div class="verify">
    <div class="wrap">
      <span>
        验证手机号
      </span>
      <input type="number" pattern="\d*" placeholder="请输入需要验证手机号" />
    </div>
    <button class="qr" @click="QRcode">
      生成绑定二维码
    </button>
    <div class="art" v-show="on" @click.stop="closed">
      <div class="out" @click.stop="() => false">
        <h3>
          <i class="v-sml"></i><i class="v-big"></i><span>扫描二维码</span
          ><i class="v-big"></i><i class="v-sml"></i>
        </h3>
        <img v-lazy="" alt="" />
        <div>
          <p>
            <i class="v-i"></i>
            为保证账户安全，请勿将二维码泄露给他人。
          </p>
          <p>
            <i class="v-i"></i>
            长按识别或扫一扫，半小时内有效。
          </p>
        </div>

        <button @click.stop="closed">确认</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        on:0
    }
  },
  components: {

  },
  methods:{
      QRcode() {
          this.on=1
      },
      closed() {
          this.on=0
      }
  }
}
</script>

<style scoped lang="scss">
.verify {
  @include bg-fixed(0, 0, $bgColor, 5);
  .wrap {
    margin-top: 20px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 25px;
    input {
      flex: 1;
      padding: 20px;
      border: none;
      @include placeholder;
    }
  }
  .qr {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    border: none;
    background: #0086f8;
    color: #fff;
    font-weight: bold;
    padding: 30px;
    border-radius: 10px;
  }
  .art {
    @include bg-fixed(0, 0, rgba(0, 0, 0, 0.3), 7);
    display: flex;
    justify-content: center;
    align-items: center;
    .out {
      width: 85%;
      display: flex;
      flex-direction: column;
      background: #fff;
      align-items: center;
      border-radius: 20px;
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
      img {
        width: 340px;
        height: 340px;
        border-radius: 10px;
      }
      div {
        border-bottom: 1px solid #cce7fe;
        padding: 30px;
        width: 100%;
        box-sizing: border-box;
        p {
          display: flex;
          text-align: left;
          align-items: center;
          color: #8e8e8e;
          .v-i {
            width: 4px;
            height: 4px;
            background: #8e8e8e;
            border-radius: 50%;
            margin: 0 10px;
          }
        }
      }
      button {
        color: #0086f8;
        border: none;
        background: #fff;
        margin: 30px 0;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
