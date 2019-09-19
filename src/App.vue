<template>
  <div id="app">
    <div id="nav" ref="nav" v-show="nav">
      <router-link
        v-for="(item, index) in listdata"
        :to="item.url"
        :key="index"
        @click.native="changeIMG(index)"
      >
        <img :src="index == active ? item.imgURL[1] : item.imgURL[0]" />
        <span>{{ item.text }}</span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.getURL()
    this.navShow()
  },
  activated() {
    this.getURL()
  },
  data() {
    return {
      nav: 1,
      active: 0,
      listdata: [
        {
          url: '/home',
          imgURL: [
            require('./common/img/icon-Business.png'),
            require('./common/img/icon-selected-Business.png')
          ],
          text: '商户中心'
        },
        {
          url: '/about',
          imgURL: [
            require('./common/img/icon-equipment.png'),
            require('./common/img/icon-selected-equipment.png')
          ],
          text: '设备管理2'
        },
        {
          url: '/star',
          imgURL: [
            require('./common/img/icon-Receivables.png'),
            require('./common/img/icon-selected-Receivables.png')
          ],
          text: '收款管理3'
        },
        {
          url: '/person',
          imgURL: [
            require('./common/img/icon-personal.png'),
            require('./common/img/icon-selected-personal.png')
          ],
          text: '个人中心'
        }
      ]
    }
  },
  methods: {
    changeIMG(index) {
      this.active = index
    },
    getURL() {
      if (this.$route.path.indexOf('/home') > -1) {
        this.active = 0
      } else if (this.$route.path.indexOf('/about') > -1) {
        this.active = 1
      } else if (this.$route.path.indexOf('/star') > -1) {
        this.active = 2
      } else if (this.$route.path.indexOf('/person') > -1) {
        this.active = 3
      }
    },
    navShow() {
      const navPath = this.$route.path

      if (
        navPath == '/home' ||
        navPath == '/about' ||
        navPath == '/star' ||
        navPath == '/person'
      ) {
        this.nav = 1
      } else {
        this.nav = 0
      }
    }
  },
  watch: {
    $route() {
      console.log(this.$route.path)
      this.navShow()
    },
    getIndex(val) {
      this.$refs.nav.style.zIndex = val
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: $bgColor;
  box-sizing: border-box;
}
#nav {
  padding: 20px;
  position: fixed;
  height: 145px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  z-index: 4;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.1);
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
    color: #8f8f8f;
    &.router-link-active {
      color: #0086f8;
    }
    img {
      width: 48%;
      padding-bottom: 10px;
    }
  }
}
</style>
