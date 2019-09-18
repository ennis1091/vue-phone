<template>
  <div class="instructions" @click.stop="closed">
    <div class="content" @click.stop="() => ''">
      <img :src="imgURL" alt="" />
      <div class="d-ul">
        <slot>
          <ul class="alert-ul">
            <li></li>
          </ul>
        </slot>
      </div>
      <div class="sub">
        <button @click.stop="closed">{{ text }}</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
 props:{
      imgURL: {
          type: String,
          default: ''
      },
      text:{
        type: String,
        default:'我知道了'
      }
    },
 data() {
    return {

    }
  },
  components: {

  },
  methods:{
      closed() {
          this.$emit('closed')
      }
  }
}
</script>

<style scoped lang="scss">
.instructions {
  @include bg-fixed(0, 0, rgba(0, 0, 0, 0.5), 99999999);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    background: #fff;
    width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 180px;
    }
    .d-ul {
      padding: 40px;
      border-bottom: 1px solid #d1e9fe;
      .alert-ul {
        text-align: left;
        font-size: 25px;
        color: #4d4d4d;
        li {
          padding-bottom: 30px;
          display: flex;
          align-items: stretch;
          div {
            &:last-child {
              span {
                color: #8e8e8e;
              }
            }
            .v-i {
              display: inline-block;
              width: 6px;
              height: 6px;
              background: #4d4d4d;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .sub {
      text-align: center;
      button {
        background: none;
        border: none;
        color: #0086f8;
        font-weight: bold;
        font-size: 30px;
        padding: 30px;
      }
    }
  }
}
</style>
