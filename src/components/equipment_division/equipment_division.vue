<template>
  <div class="division">
    <ul>
      <li>
        <img v-lazy="" alt="" />
        <div class="d-r">
          <div>
            <span>12641654654</span>
            <span>类型：代理商</span>
          </div>
          <div>
            <span>10%</span>
            <span>分成比例</span>
          </div>
        </div>
      </li>
      <li>
        <img v-lazy="" alt="" />
        <div class="d-r">
          <div>
            <span>12641654654</span>
            <span>类型：代理商</span>
          </div>
          <div>
            <span>10%</span>
            <span>分成比例</span>
          </div>
        </div>
      </li>
      <li>
        <img v-lazy="" alt="" />
        <div class="d-r">
          <div>
            <span>12641654654</span>
            <span>类型：代理商</span>
          </div>
          <div>
            <span>10%</span>
            <span>分成比例</span>
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
.division {
  @include bg-fixed(0, 0, $bgColor, 6);
  ul {
    margin-top: 20px;
    li {
      margin-bottom: 10px;
      background: #fff;
      padding: 30px 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 80px;
        margin-right: 20px;
      }
      .d-r {
        flex: 1;
        display: flex;
        justify-content: space-between;
        div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
