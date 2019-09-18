<template>
  <div class="earnings">
    <div id="wrap">
      <div
        class="report"
        :style="{
          background:
            'url(' +
            require('@/common/img/bg2.png') +
            ') no-repeat center center',
          'background-size': '100% 100%'
        }"
      >
        <h3>总金额（元）</h3>
        <b>2022.02</b>
        <p>
          <span class="t-left"
            ><img src="@/common/img/bg-green.png" alt="" />线上：￥1022.02</span
          >
          <span
            ><img src="@/common/img/bg-blue.png" alt="" />线下：￥1022.02</span
          >
        </p>
        <div
          class="img-right"
          :style="{
            background:
              'url(' +
              require('@/common/img/earning-right.png') +
              ') no-repeat center center',
            'background-size': '100% 100%'
          }"
        >
          <span @click="show">
            <i class="iconfont icon-tishi"></i>
            查看说明
          </span>
        </div>
      </div>
      <div class="today">
        <h3 class="h-title">
          <img src="@/common/img/icon-money.png" class="icon-img" alt="" />
          今日营收
        </h3>
        <ul>
          <li>
            <span>营业额</span>
            <span class="number">2323<b>元</b></span>
          </li>
          <li>
            <span>线上金额</span>
            <span class="number">2323<b>元</b></span>
          </li>
          <li>
            <span>线下金额</span>
            <span class="number">2323<b>元</b></span>
          </li>
        </ul>
      </div>
      <div class="chart">
        <div class="chart-header">
          <h3 class="h-title">
            <img src="@/common/img/icon-chart.png" class="icon-img" alt="" />
            营收趋势
          </h3>
          <p>
            <b>
              {{ all }}
            </b>
            <span>
              总营业额
            </span>
          </p>
          <div class="text">
            <span>
              <i></i>
              线上：￥{{ online }}
            </span>
            <span>
              <i></i>
              线下：￥{{ offline }}
            </span>
          </div>
        </div>
        <div class="v-chart">
          <ve-line
            :data="chartData"
            :legend-visible="false"
            :extend="extend"
            height="350px"
            :events="chartEvents"
          >
          </ve-line>
        </div>
      </div>
    </div>
    <instructions :imgURL="imgURL" :text="text" v-show="on" @closed="closed">
      <ul class="alert-ul">
        <li>
          <div><i class="v-i"></i></div>
          <div><span>总收益：</span>线上收益+线下收益。</div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div><span>线上总收益：</span>指线上订单中每笔订单收益总和。</div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div><span>线下总收益：</span>指线下订单中每笔订单收益总和。</div>
        </li>
        <li>
          <div><i class="v-i"></i></div>
          <div><span>统计时间：</span>每十分钟统计一次</div>
        </li>
      </ul>
    </instructions>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import VeLine from 'v-charts/lib/line.common'
import echarts from 'echarts'
import instructions from '@/base/instructions/instructions'

export default {
  data () {
      let self = this
      this.chartEvents = {
        click: function (e) {
          self.name = e.name
          self.$router.push({name: 'earningslist', query: { plan: '123' }})
        }
      },
      this.extend ={
          xAxis: {
            axisLine:{
            show:false
            },
            boundaryGap: false,
            axisLabel:{
              interval:29,
              align: 'right'
            }
          },
          yAxis :{
            splitLine:{
              show: true,
              lineStyle:{
                type:'dashed'
              }
            }
          },
          tooltip:{
            formatter: '{b0}',
            position: function (point, params, dom, rect, size) {
                // 固定在顶部

                let morearr = self.originalData.filter(function (number) {
                    return number['time']==dom.innerHTML
                })
                self.online=morearr[0]['online']
                self.offline=morearr[0]['offline']
            }
          },
          series : {
            type:'line',
            itemStyle: {
                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                            offset: 0, color: '#81befd' // 0% 处的颜色
                        }, {
                            offset: 0.4, color: '#e4f2ff' // 100% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }]
                    ), //背景渐变色
                    lineStyle: {        // 系列级个性化折线样式
                        width: 2,
                        type: 'solid',
                        color: "#42a5fa" //折线的颜色
                    }
                  },
              emphasis: {
                  color: '#42a5fa',
                  lineStyle: {        // 系列级个性化折线样式
                      width: 2,
                      type: 'dotted',
                      color: "42a5fa"
                  }
                }
              },//线条样式
              smooth: false,  //true 为平滑曲线，false为直线
              showSymbol :false,        //不显示拐点，hover时候显示
              symbolSize :8,
              label: {
                  normal: {
                      show: false
                  }
              },
              areaStyle: {normal: {}}
          }
        }
      return {
        imgURL:require('@/common/img/bg-profit.png'),
        text:'我知道了',
        on:0,
        name:'',
        online:1236,
        offline:4568,
        originalData:[
            { 'time': '01-01', 'online': 1093,'offline':2355 },
            { 'time': '01-02', 'online': 1093,'offline':5366 },
            { 'time': '01-03', 'online': 1235,'offline':4235 },
            { 'time': '01-04', 'online': 1299,'offline':4533 },
            { 'time': '01-05', 'online': 1093,'offline':5366 },
            { 'time': '01-06', 'online': 1093,'offline':5366 },
            { 'time': '01-07', 'online': 1093,'offline':5366 },
            { 'time': '01-08', 'online': 3333,'offline':4872 },
            { 'time': '01-09', 'online': 1093,'offline':5366 },
            { 'time': '01-10', 'online': 1093,'offline':5366 },
            { 'time': '01-11', 'online': 1093,'offline':5366 },
            { 'time': '01-12', 'online': 1093,'offline':1111 },
            { 'time': '01-13', 'online': 1093,'offline':5366 },
            { 'time': '01-14', 'online': 1093,'offline':2222 },
            { 'time': '01-15', 'online': 1093,'offline':5666 },
            { 'time': '01-16', 'online': 2424,'offline':5366 },
            { 'time': '01-17', 'online': 1093,'offline':5366 },
            { 'time': '01-18', 'online': 1093,'offline':5366 },
            { 'time': '01-19', 'online': 1093,'offline':5366 },
            { 'time': '01-20', 'online': 1093,'offline':456 },
            { 'time': '01-21', 'online': 1093,'offline':5366 },
            { 'time': '01-22', 'online': 1093,'offline':5366 },
            { 'time': '01-23', 'online': 1093,'offline':5366 },
            { 'time': '01-24', 'online': 1093,'offline':325 },
            { 'time': '01-25', 'online': 1093,'offline':5366 },
            { 'time': '01-26', 'online': 433,'offline':5366 },
            { 'time': '01-27', 'online': 1093,'offline':5366 },
            { 'time': '01-28', 'online': 2122,'offline':5366 },
            { 'time': '01-29', 'online': 1093,'offline':456 },
            { 'time': '01-30', 'online': 1093,'offline':5366 },
            { 'time': '01-31', 'online': 3333,'offline':5366 }
          ],
        chartData: {
          columns: ['日期', '总营业额'],
          rows: [
            { '日期': '01-01', '总营业额': 1093 },
            { '日期': '01-02', '总营业额': 3230 },
            { '日期': '01-03', '总营业额': 2623 },
            { '日期': '01-04', '总营业额': 2623 },
            { '日期': '01-05', '总营业额': 5224 },
            { '日期': '01-06', '总营业额': 8522 },
            { '日期': '01-07', '总营业额': 3544 },
            { '日期': '01-08', '总营业额': 5246 },
            { '日期': '01-09', '总营业额': 2321 },
            { '日期': '01-10', '总营业额': 3333 },
            { '日期': '01-11', '总营业额': 5623 },
            { '日期': '01-12', '总营业额': 2623 },
            { '日期': '01-13', '总营业额': 2623 },
            { '日期': '01-14', '总营业额': 5648 },
            { '日期': '01-15', '总营业额': 2623 },
            { '日期': '01-16', '总营业额': 8555 },
            { '日期': '01-17', '总营业额': 2623 },
            { '日期': '01-18', '总营业额': 2222 },
            { '日期': '01-19', '总营业额': 1123 },
            { '日期': '01-20', '总营业额': 6666 },
            { '日期': '01-21', '总营业额': 2623 },
            { '日期': '01-22', '总营业额': 2623 },
            { '日期': '01-23', '总营业额': 2623 },
            { '日期': '01-24', '总营业额': 2354 },
            { '日期': '01-25', '总营业额': 2623 },
            { '日期': '01-26', '总营业额': 2623 },
            { '日期': '01-27', '总营业额': 6575 },
            { '日期': '01-28', '总营业额': 2623 },
            { '日期': '01-29', '总营业额': 3492 },
            { '日期': '01-30', '总营业额': 3492 },
            { '日期': '01-31', '总营业额': 4293 }
          ]
        },
      }
    },
  components: {
      VeLine,
      instructions
  },
  computed:{
    all() {
      return parseInt(this.online)+parseInt(this.offline)
    }
  },
  methods:{
    show() {
      this.on=1
    },
    closed() {
      this.on=0
    }
  }
}
</script>

<style scoped lang="scss">
.earnings {
  @include bg-fixed(0, 0, $bgColor, 5);
  overflow-y: scroll;
  #wrap {
    padding: 20px;
  }
  .report {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    box-shadow: #a0c3e0 0 0 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
    h3 {
      font-weight: normal;
      color: #ddf0ff;
      padding-top: 28px;
      font-size: 30px;
    }
    b {
      font-size: 60px;
      padding: 20px 0;
    }
    p {
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: #ddf0ff;
        img {
          padding-right: 18px;
          width: 16px;
          height: 16px;
        }
      }
      .t-left {
        margin-right: 80px;
      }
    }
    .img-right {
      width: 170px;
      height: 60px;
      position: absolute;
      top: 42px;
      right: -6px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-top: -12px;
        margin-left: -3px;
      }
    }
  }
  .h-title {
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 28px;
    .icon-img {
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
  }
  .today {
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    border-radius: 10px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        span {
          padding-top: 12px;
          color: #acacac;
          font-size: 24px;
        }
        .number {
          font-size: 35px;
          font-weight: bold;
          color: #f88c00;
          margin-bottom: 10px;
          b {
            font-size: 26px;
          }
        }
      }
    }
  }
  .chart {
    margin-top: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    .chart-header {
      padding: 20px;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        b {
          font-size: 35px;
        }
        span {
          color: #a5a5a5;
        }
      }
      .text {
        display: flex;
        justify-content: space-around;
        padding-top: 20px;
      }
    }
    .v-chart {
      margin-top: -40px;
      .ve-line {
        height: 300px !important;
        overflow: hidden;
      }
    }
  }
}
</style>
