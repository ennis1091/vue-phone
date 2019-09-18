<template>
  <div class="transfer">
    <header>
      <div class="search">
        <input type="text" placeholder="请输入设备名称" />
        <i class="iconfont icon-search"></i>
      </div>
    </header>
    <marquee bgcolor="#56b1ff" behavior="" direction="">
      <div class="title">
        可转让设备 1 台，转让条件：设备管理员且分成占比为商户下100%。
      </div>
    </marquee>
    <div class="list">
      <ul>
        <li v-for="(item, index) in checkboxData" :key="index">
          <img v-lazy="" alt="" />
          <div class="content">
            <h3>产品名称</h3>
            <p>编号：5465465456465</p>
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              :id="`checkbox-1-${item.id}`"
              class="v-checkbox"
              :value="item.id"
              v-model="checkboxList"
            /><label :for="`checkbox-1-${item.id}`"></label>
          </div>
        </li>
      </ul>
    </div>
    <div class="fix-btn">
      <button
        :class="{ 'b-check': checkboxList.length }"
        :disabled="disabled"
        ref="btn"
        @click="address"
      >
        转让设备
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
        value:[],
        checkboxData:[{
                id:'1',
                value:'苹果'
            },{
                id:'2',
                value:'荔枝'
            },{
                id:'3',
                value:'香蕉'
            },{
                id:'4',
                value:'火龙果'
         }],
         checkboxList:[]
         }
      },

  components: {
  },
  methods:{
    address() {
      this.$router.push({name:'validation'})
    }
  },
  computed:{
    disabled:function (params) {   //不能用箭头函数  会改变this 指向
      if (this.checkboxList.length) {
        return false
      }else{
        return true
      }

    }
  }
}
</script>

<style scoped lang="scss">
.transfer {
  @include bg-fixed(0, 0, $bgColor, 5);
  header {
    height: 100px;
    background: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .search {
      display: flex;
      flex: 1;
      padding: 25px;
      background: $bgColor;
      border-radius: 10px;
      input {
        border: none;
        flex: 1;
        background: $bgColor;
      }
      .icon-search {
        font-size: 24px;
      }
    }
  }
  .title {
    background: #56b1ff;
    color: #fff;
    text-align: left;
    height: 52px;
    line-height: 52px;
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
      text-align: center;
      background: #56b1ff;
      border-radius: 10px;
    }
    .b-check {
      background: #0086f8;
    }
  }
  .list {
    position: fixed;
    bottom: 285px;
    top: 146px;
    width: 100%;
    overflow: hidden;
    ul {
      margin-top: 20px;
      height: 100%;
      overflow-y: scroll;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        background: #fff;
        text-align: left;
        margin-bottom: 10px;
        img {
          width: 94px;
          height: 94px;
        }
        .content {
          flex: 1;
          padding: 0 25px;
          h3 {
            font-size: 30px;
          }
          p {
            font-size: 26px;
            @include ellipsis;
            color: #a5a5a5;
          }
        }
        .checkbox {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .v-checkbox {
      display: none;
    }

    .v-checkbox + label {
      background-color: #fff;
      border: 1px solid #d2d2d2;
      background: #f3f3f3;
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 9px;
      display: inline-block;
      position: relative;
    }

    .v-checkbox + label:active,
    .v-checkbox:checked + label:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .v-checkbox:checked + label {
      background-color: #0086f8;
      border: 1px solid #0086f8;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -12px 10px -12px rgba(0, 0, 0, 0.05),
        inset 12px 10px -12px rgba(255, 255, 255, 0.1);
      color: #99a1a7;
    }

    .v-checkbox:checked + label:after {
      content: '\2713';
      font-size: 17px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgb(255, 255, 255);
    }
  }
}
</style>
