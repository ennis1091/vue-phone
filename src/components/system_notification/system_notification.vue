<template>
  <scroll class="notification" :data="data">
    <div>
      <div class="day">
        <span class="time">2019-06-29</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
      <div class="day">
        <span class="time">2019-06-28</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题税收对哈斯的申诉时胡思安徽短时</b>
              <span>文案文案文案稳拿啊啊暗暗啊555555555555555</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
      <div class="day">
        <span class="time">2019-06-28</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题税收对哈斯的申诉时胡思安徽短时</b>
              <span>文案文案文案稳拿啊啊暗暗啊555555555555555</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
      <div class="day">
        <span class="time">2019-06-28</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题税收对哈斯的申诉时胡思安徽短时</b>
              <span>文案文案文案稳拿啊啊暗暗啊555555555555555</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
      <div class="day">
        <span class="time">2019-06-28</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题税收对哈斯的申诉时胡思安徽短时</b>
              <span>文案文案文案稳拿啊啊暗暗啊555555555555555</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
      <div class="day">
        <span class="time">2019-06-28</span>
        <ul>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题</b>
              <span>文案文案文案稳拿啊啊暗暗啊</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
          <li>
            <i class="v-red"></i>
            <img v-lazy="" alt="" />
            <p>
              <b>主标题主标题税收对哈斯的申诉时胡思安徽短时</b>
              <span>文案文案文案稳拿啊啊暗暗啊555555555555555</span>
            </p>
            <i class="iconfont icon-xiangqian"></i>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      data:[]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.notification {
  @include bg-fixed(0, 0, $bgColor, 5);
  padding-top: 20px;
  overflow-y: hidden;
  .day {
    margin-bottom: 10px;
    background: #fff;
    .time {
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bbbbbb;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f3f3f3;
        padding: 30px;
        .v-red {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #d90000;
          margin-right: 10px;
        }
        p {
          display: flex;
          flex-direction: column;
          text-align: left;
          flex: 1;
          padding: 0 15px;
          @include ellipsis;
          b {
            font-size: 28px;
            padding-bottom: 10px;
            width: 100%;
            @include ellipsis;
          }
          span {
            color: #9d9d9d;
            width: 100%;
            @include ellipsis;
          }
        }
        img {
          width: 100px;
          height: 100px;
        }
        .icon-xiangqian {
          color: #dcdcdc;
        }
      }
    }
  }
}
</style>
