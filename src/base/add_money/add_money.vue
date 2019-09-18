<template>
  <div class="my" @click="close">
    <div class="wrap" @click.stop="wrapDiv">
      <div class="top-bt">
        <span class="close" @click="close">关闭</span>
        <span class="submit" @click="submit">保存</span>
      </div>
      <div class="bot-word">
        <div>
          <input
            type="number"
            pattern="\d*"
            placeholder="请输入价格"
            v-model="price"
          />
          <span>元</span>
          <input
            type="number"
            pattern="\d*"
            placeholder="请输入时间"
            v-model="time"
          />
          <span>小时</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      price:'',
      time:''
    }
  },
  components: {

  },
   methods:{
      close() {
          this.$emit('closeMoney')
      },
      wrapDiv() {
        return;
      },
      submit() {
        if (!this.price||!this.time) {
          this.$toast({
            message: '请输入金额和时间',
            duration: 3000
          });
        }else{
          this.$emit('seletMoney',this.price,this.time)
        }
      }
  }
}
</script>

<style scoped lang="scss">
.my {
  @include bg-fixed(0, 0, rgba($color: #000000, $alpha: 0.3), 7);
  overflow: hidden;
  .wrap {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .top-bt {
    display: flex;
    width: 100%;
    justify-content: space-between;
    span {
      border: 1px solid #0086f8;
      padding: 20px 34px;
      color: #0086f8;
      font-size: 26px;
      font-weight: bold;
      border-radius: 10px;
    }
    .submit {
      background: #0086f8;
      color: #fff;
    }
  }
  .bot-word {
    height: 328px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      border: none;
      width: 190px;
      border-bottom: 1px solid #5c5c5c;
      padding: 5px;
      margin: 0 10px;
      text-align: center;
      font-size: 25px;
      &:focus {
        color: #0086f8;
        border-color: #0086f8;
      }
      @include placeholder;
    }
    span {
      vertical-align: -webkit-baseline-middle;
      font-weight: bold;
    }
  }
}
</style>
