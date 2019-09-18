<template>
  <div class="tel">
    <div class="change">
      <p>当前手机号为：<i>15616515615</i></p>
      <ul>
        <li>
          <span class="name">原手机号</span>
          <input type="number" pattern="\d*" placeholder="请输入旧手机号" />
        </li>
        <li>
          <span class="name">新手机号</span>
          <input type="number" pattern="\d*" placeholder="请输入新手机号" />
        </li>
        <li class="yanz">
          <span class="name">验证<i>码</i></span>
          <input type="number" pattern="\d*" placeholder="请输入手机验证码" />
          <b @click="getCode($event)" :class="{ code: timer }">获取验证码</b>
        </li>
      </ul>
    </div>
    <button>确定</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        timer:null
    }
  },
  methods:{
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
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.tel {
  @include bg-fixed(0, 0, $bgColor, 4);
  .change {
    text-align: left;
    p {
      padding: 30px 20px;
      font-size: 28px;
      color: #8e8e8e;
      i {
        color: #0086f8;
      }
    }
    ul {
      background: #fff;
      li {
        padding: 30px 20px;
        border-bottom: 1px solid #f3f3f3;
        display: flex;
        align-items: center;
        font-size: 28px;
        .name {
          padding-right: 30px;
          color: #5c5c5c;
          i {
            letter-spacing: 1em;
          }
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
      .yanz {
        padding: 20px;
      }
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
    font-size: 30px;
    border-radius: 10px;
  }
}
</style>
