<template>
  <div>
    <div>
      <span @click="openByDialog($event)" class="span-data">
        {{ calendar.display }}
        <!-- <input
          type="text"
          ref="input4"
          :value="calendar.display"
          class="input-data"
          readonly
          @click="openByDialog($event)"
        /> -->
        <i class="iconfont icon-arrowDown"></i>
      </span>
    </div>

    <transition name="fade">
      <div class="calendar-dialog" v-if="calendar.show">
        <div class="calendar-dialog-mask" @click="closeByDialog"></div>

        <div class="calendar-dialog-body">
          <div class="calendar-two-btn">
            <span @click="closeByDialog">取消</span
            ><span @click="submitData">确定</span>
          </div>
          <calendar
            ref="calendar"
            :range="calendar.range"
            :zero="calendar.zero"
            :lunar="calendar.lunar"
            :value="calendar.value"
            @select="calendar.select"
            @inputVal="inputVal"
          ></calendar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import calendar from './calendar/calendar.vue'
export default {
  components: {
    calendar
  },
  mounted() {
    this.today()
  },
  data() {
    return {
      dataOld: '',
      valueOld: [],
      calendar: {
        display: '2018-02-16',
        show: false,
        range: true,
        zero: true,
        value: [], //默认日期
        /*  lunar:true, //显示农历 */
        select: (begin, end) => {
          this.calendar.show = true
          this.calendar.value = [begin, end]
          this.calendar.display = begin.join('-') + ' 至 ' + end.join('-')
        }
      }
    }
  },
  methods: {
    today() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let showDay = []
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      showDay.push(year, month, day)
      console.log(showDay)
      this.calendar.value.push(showDay, showDay)
      this.calendar.display = showDay.join('-')
    },
    inputVal(begin) {
      this.calendar.display = begin.join('-')
      console.log(begin)
      this.calendar.value = [begin, begin]
      console.log(this.calendar.value)
    },
    openByDrop(e) {
      this.calendar3.show = true
      this.calendar3.left = e.target.offsetLeft + 19
      this.calendar3.top = e.target.offsetTop + 70

      e.stopPropagation()
      window.setTimeout(() => {
        document.addEventListener(
          'click',
          e => {
            this.calendar3.show = false
            document.removeEventListener('click', () => {}, false)
          },
          false
        )
      }, 1000)
    },
    openByDialog(e) {
      this.calendar.show = true
      this.dataOld = this.calendar.display
      this.valueOld = this.calendar.value
    },
    closeByDialog() {
      this.calendar.display = this.dataOld
      this.calendar.value = this.valueOld
      this.calendar.show = false
    },
    submitData() {
      if (this.calendar.value.length > 1) {
        if (
          this.calendar.value[0][0] != this.calendar.value[1][0] ||
          this.calendar.value[0][1] != this.calendar.value[1][1]
        ) {
          this.$toast({
            message: '日期不能跨年月,请重新选择!',
            duration: 3000
          })
        } else {
          this.calendar.show = false
        }
      } else {
        this.calendar.show = false
      }
    },
    openMultiByDrop(e) {
      this.calendar5.show = true
      this.calendar5.left = e.target.offsetLeft + 19
      this.calendar5.top = e.target.offsetTop + 70
      e.stopPropagation()
      window.setTimeout(() => {
        document.addEventListener(
          'click',
          e => {
            this.calendar5.show = false
            document.removeEventListener('click', () => {}, false)
          },
          false
        )
      }, 1000)
    },
    changeEvents() {
      this.calendar1.events = {
        '2017-7-20': '$' + ((Math.random() * 1000) >> 0),
        '2017-7-21': '$' + ((Math.random() * 1000) >> 0),
        '2017-7-22': '$' + ((Math.random() * 1000) >> 0)
      }
    }
  }
}
</script>

<style>
/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*弹出框*/
.calendar-dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 555;
}
.calendar-dialog-mask {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.calendar-dialog-body {
  background: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 666;
}
.calendar-two-btn {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.calendar-two-btn span {
  padding: 5px 10px;
  border: 1px solid #0086f8;
  border-radius: 5px;
  color: #0086f8;
}
.calendar-two-btn span:last-child {
  color: #fff;
  background: #0086f8;
}
.span-data {
  background: #fff;
  padding: 11px 21px;
  font-size: 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
.icon-arrowDown {
  font-size: 22px !important;
}
</style>
