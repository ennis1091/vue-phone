<template>
  <div class="renewal">
    <div class="slider">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in slider" :key="index">
          <img class="slider-img" v-lazy="item.url" :alt="item.title" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div class="t-content">
        <h3>
          <span
            v-for="(i, index) in nav"
            :key="index"
            :class="{ active: index == currIndex }"
            @click="changeIndex(index)"
          >
            {{ i }}
          </span>
        </h3>
        <ul class="nav">
          <li>
            <span class="title">设备状态</span>
            <input
              type="text"
              class="text"
              readonly="readonly"
              unselectable="on"
              onfocus="this.blur()"
              v-model="obj_val.equipment_status"
              placeholder="请选择设备状态"
              @click="showAlert1"
            />
            <i class="iconfont icon-forward"></i>
          </li>
          <li>
            <span class="title">
              设备数量
            </span>
            <span class="text num">{{ obj_val.equipment_quantity }}台</span>
          </li>
          <li>
            <span class="title">
              续费中心
            </span>
            <input
              type="text"
              class="text"
              v-model="obj_val.renewal_center"
              readonly="readonly"
              unselectable="on"
              onfocus="this.blur()"
              placeholder="请选择续费时间"
              @click="showAlert2"
            />
            <i class="iconfont icon-forward"></i>
          </li>
          <li>
            <span class="title">续费金额</span>
            <span class="text money">￥{{ obj_val.renewal_amount }}</span>
            <button class="view" @click="details">
              查看明细
            </button>
          </li>
          <li>
            <span class="description">说明</span>
            <span class="word">
              对单台设备续费可通过“设备管理”查找对应设备，对设备进行续费，或者后台进行续费操作。
            </span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <button class="submit">
          立即续费
        </button>
      </div>
    </div>

    <addSelect
      :data="list"
      v-show="on"
      @closeAlert="closeAlert"
      @selectText="selectText"
    ></addSelect>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import addSelect from'@/base/add_select/add_select'
export default {
  data() {
    return {
        list:[],
        on:0,
        self:1,
        obj_val:{
          equipment_status:"",
          equipment_quantity:"555",
          renewal_center:"",
          renewal_amount:"0.00"
        },
        currIndex:0,
        nav:['全部设备','已到期','即将到期'],
        slider:[
            {
                url:require("@/common/img/bannar.jpg"),
                title:'清凉一夏'
            },
            {
                url:require('@/common/img/bannar.jpg'),
                title:'清凉一夏'
            },
            {
                url:require('@/common/img/bannar.jpg'),
                title:'清凉一夏'
            }
        ]
    }
  },
  components: {
    addSelect
  },
  methods:{
    changeIndex(index) {
      this.currIndex=index;
    },
    showAlert1() {
        this.list=['全部','启用','停用']
        this.on=1
        this.self=1
    },
    showAlert2() {
        this.list=['12个月','6个月','3个月','1个月']
        this.on=1
        this.self=2
    },

    closeAlert() {
        this.on=0
    },
    selectText(value) {
      if (this.self==1) {
          this.obj_val.equipment_status=value
      }else if (this.self==2) {
        this.obj_val.renewal_center=value
      }
        this.on=0
    },
    details() {
      this.$router.push({name: 'viewDetails'})
    }
  }
}
</script>

<style scoped lang="scss">
.renewal {
  @include bg-fixed(0, 0, $bgColor, 5);
  overflow-y: scroll;
  .slider {
    height: 298px;
    .slider-img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    color: #8e8e8e;
    position: absolute;
    top: 259px;
    bottom: 0;
    width: 100%;
    .t-content {
      margin: 0 auto;
      width: 90%;
      border-radius: 10px;
      background: #fff;
    }
    h3 {
      span {
        padding: 40px 10px;
        font-size: 28px;
      }

      display: flex;
      justify-content: space-around;
    }
    .active {
      color: #0086f8;
      border-bottom: 6px solid #0086f8;
    }
    .nav {
      li {
        display: flex;
        justify-content: space-between;
        padding: 38px 28px 38px 50px;
        border-top: 1px solid #eaeaea;
        align-items: baseline;
        text-align: left;
        .title {
          padding-right: 20px;
          font-weight: bold;
          color: #5c5c5c;
        }
        .num {
          color: #5c5c5c;
        }
        .money {
          color: #fe8e18;
        }
        .text {
          flex: 1;
          padding: 5px;
        }
        input {
          @include placeholder($color: #8e8e8e);
          border: none;
        }
        .view {
          border: 1px solid #0086f8;
          color: #0086f8;
          background: #fff;
          padding: 10px 15px;
          border-radius: 5px;
        }
        .description {
          background: #8ecbff;
          color: #fff;
          padding: 3px 8px;
          white-space: nowrap;
          border-radius: 10px;
          margin-right: 20px;
          font-size: 24px;
        }
      }
    }
  }
  .btn {
    padding-bottom: 30px;
    position: absolute;
    top: 890px;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
  }
  .submit {
    width: 100%;
    border: none;
    background: linear-gradient(top, #fdae18, #ff7c17);
    color: #fff;
    font-weight: bold;
    padding: 28px 0;
    font-size: 30px;
    border-radius: 10px;
  }
}
</style>
