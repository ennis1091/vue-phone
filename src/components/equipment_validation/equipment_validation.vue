<template>
  <div class="vali">
    <ul>
      <li>
        <span>设备名称</span>
        <input type="text" placeholder="请输入产品名称" />
      </li>
      <li class="boder">
        <span>转让手机号</span>
        <input type="number" pattern="\d*" placeholder="请输入产品名称" />
      </li>
      <li>
        <span>验证码</span>
        <input
          type="number"
          pattern="\d*"
          placeholder="请输入本账户手机验证码"
        />
        <b @click="getCode($event)" :class="{ code: timer }">获取验证码</b>
      </li>
    </ul>
    <div class="fix-btn">
      <button>
        确认转让
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      timer:null
    }
  },
  components: {

  },
  methods: {
    getCode(e) {
      if (this.timer) {
        console.log(this.timer)
       return
      }else{
        let num=10
         e.target.innerHTML=`${num}秒后重新发送`
        this.timer = window.setInterval(() => {
          num--
          e.target.innerHTML=`${num}秒后重新发送`

          if (num<0) {
            window.clearInterval(this.timer)
            this.timer=null
            e.target.innerHTML="获取验证码"
          }
        }, 1000);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.vali {
  @include bg-fixed(0, 0, $bgColor, 6);
  ul {
    background: #fff;
    margin-top: 20px;
    li {
      padding: 20px;
      text-align: left;
      align-items: center;
      display: flex;
      justify-content: space-between;
      color: #8e8e8e;
      span {
        color: #333;
        padding-right: 25px;
      }
      input {
        flex: 1;
        border: none;
        @include placeholder;
      }
      b {
        border: 1px solid #0086f8;
        color: #0086f8;
        padding: 14px;
        border-radius: 8px;
      }
      .code {
        color: #d9d9d9;
        border-color: #d0d0d0;
      }
    }
    .boder {
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 40px;
    }
  }
  .fix-btn {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 145px;
    width: 100%;
    button {
      border: none;
      width: 702px;
      height: 100px;
      color: #fff;
      font-weight: bold;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #0086f8;
      border-radius: 10px;
    }
  }
}
</style>
