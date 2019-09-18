<template>
  <div class="ad">
    <div class="content">
      <div class="padding-d">
        <div class="li-d">
          <span>产品名称</span
          ><input
            class="in-pt"
            type="text"
            v-model="obj_val.product_name"
            placeholder="请输入产品名称"
          />
        </div>
        <div class="li-d">
          <span>产品类型</span
          ><span class="in-pt" @click="showAlert1"
            ><input
              class="sm-pt"
              type="text"
              readonly="readonly"
              unselectable="on"
              onfocus="this.blur()"
              v-model="obj_val.product_type"
              ref="input1"
              placeholder="请选择产品类型"/><i class="iconfont icon-forward"></i
          ></span>
        </div>
        <div class="li-d">
          <span>附加属性</span
          ><span class="in-pt" @click="showAlert2"
            ><input
              class="sm-pt"
              type="text"
              readonly="readonly"
              unselectable="on"
              onfocus="this.blur()"
              v-model="obj_val.product_attributes"
              ref="input2"
              placeholder="请选择附加属性"/><i class="iconfont icon-forward"></i
          ></span>
        </div>
        <div class="li-d">
          <span>产品价格</span
          ><span class="in-pt" @click="showAlert3"
            ><input
              class="sm-pt"
              type="text"
              readonly="readonly"
              unselectable="on"
              onfocus="this.blur()"
              ref="input3"
              v-model="obj_val.product_money"
              placeholder="请点击输入产品价格"/>
            <i class="iconfont icon-forward"></i
          ></span>
        </div>
        <div class="li-d">
          <span>投币个数</span
          ><input
            class="in-pt"
            type="number"
            pattern="\d*"
            v-model="obj_val.product_num"
            placeholder="请输入投币个数"
          />
        </div>
        <div class="li-d">
          <span>添加照片</span>
          <div class="in-pt"><upload></upload></div>
        </div>
      </div>
      <div class="submit" @click="submit">添加产品</div>
    </div>

    <addSelect
      :data="list"
      v-show="on"
      @closeAlert="closeAlert"
      @selectText="selectText"
    ></addSelect>
    <addMoney
      v-show="money"
      @closeMoney="closeMoney"
      @seletMoney="seletMoney"
    ></addMoney>
  </div>
</template>

<script type="text/ecmascript-6">
import addSelect from '@/base/add_select/add_select'
import addMoney from '@/base/add_money/add_money'
import upload from '@/base/upload/upload'
export default {
  data() {
    return {
        list:[],
        on:0,
        money:0,
        self:1,
        obj_val:{
          product_name:"",
          product_type:"",
          product_attributes:"",
          product_money:"",
          product_num:""
        }
    }
  },
  components: {
    addSelect,
    addMoney,
    upload
  },
  methods:{
    showAlert1() {
        this.list=['时间计费','电量计费']
        this.on=1
        this.self=1
    },
    showAlert2() {
        this.list=['无']
        this.on=1
        this.self=2
    },
    showAlert3() {
        this.money=1
        this.self=3
    },
    closeAlert() {
        this.on=0
    },
    closeMoney() {
        this.money=0
    },
    selectText(value) {
      if (this.self==1) {
          this.obj_val.product_type=value
      }else if (this.self==2) {
        this.obj_val.product_attributes=value
      }
        this.on=0
    },
    seletMoney(value1,value2) {
      this.obj_val.product_money=`${value1}元  ${value2}小时`
      this.money=0
    },
    submit() {
      let obj=this.obj_val
      if (obj.product_name=='') {
        this.$toast('请输入产品名称')
     }else if (obj.product_type=='') {
        this.$toast('请选择产品类型');
     }else if (obj.product_attributes=='') {
        this.$toast('请选择附加属性');
     }else if (obj.product_money=='') {
        this.$toast('请输入产品价格');
     }else if (obj.product_num=='') {
        this.$toast('请输入投币个数');
     }
    }
  }
}
</script>

<style scoped lang="scss">
.ad {
  @include bg-fixed(0, 0, $bgColor, 66);
  padding-top: 20px;
  .content {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
    overflow-y: scroll;
    .padding-d {
      padding-bottom: 150px;
    }
  }
  .submit {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 20px;
    width: 95%;
    text-align: center;
    background: #0086f8;
    padding: 28px 0;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 30px;
  }
  .li-d {
    padding: 40px 26px;
    background: #fff;
    border: 1px solid $bgColor;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      border: none;
      color: #555;
      line-height: 36px;
      height: 36px;
      font-size: 28px;
      -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
      &::-webkit-input-placeholder {
        color: #c2c2c2;
      }
      &::-moz-placeholder {
        color: #c2c2c2;
      }
      &:-moz-placeholder {
        color: #c2c2c2;
      }
      &:-ms-input-placeholder {
        color: #c2c2c2;
      }
    }
    span {
      &:first-child {
        font-size: 28px;
        color: #5c5c5c;
        padding-right: 40px;
      }
    }
    .in-pt {
      flex: 1;
      display: flex;
      .sm-pt {
        flex: 1;
      }
      i {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
