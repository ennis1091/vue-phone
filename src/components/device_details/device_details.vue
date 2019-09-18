<template>
  <div class="details">
    <header class="heard">
      <div>
        <span>
          设备名称名称
        </span>
        <span>
          <i>在线</i>
          <img src="" alt="" />
        </span>
      </div>
      <div class="txt-2">
        <p>
          <span><i class="v-border yello"></i><b>充电次数：</b>12次</span>
        </p>
        <p>
          <span><i class="v-border green"></i><b>使用电量：</b>232度</span
          ><span>2019-06-27到期</span>
        </p>
      </div>
      <div class="txt-3">
        <b class="bor-r">
          浙江省-杭州市-滨江区-西陵路-xx小区-xx东xxx
        </b>
        <span class="bor-r"> <i class="iconfont icon-didian"></i>到这去 </span>
        <span> <i class="iconfont icon-dianhua"></i>电话 </span>
      </div>
    </header>
    <section class="link-a">
      <ul>
        <router-link
          tag="li"
          :to="{ name: item.name }"
          v-for="(item, index) in list"
          :key="index"
        >
          <div>
            <img :src="item.img" alt="" />
            <p>
              <b>{{ item.title }}</b>
              <span>{{ item.text }}</span>
            </p>
          </div>
        </router-link>
      </ul>
    </section>
    <div class="chart">
      <div class="chart-header">
        <h3 class="h-title">
          <span>
            <img src="@/common/img/icon-chart.png" class="icon-img" alt="" />
            营收趋势
          </span>
          <span @click="show">
            <i class="iconfont icon-arrowRight"></i>
          </span>
        </h3>
        <div v-show="on" class="sum-d">
          <div class="son-1">
            <b>
              {{ all }}
            </b>
            <span>
              总营业额
            </span>
          </div>
          <div class="son-2">
            <span>按日</span>
            <span>按月</span>
          </div>
        </div>
        <div class="text" v-show="on">
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
      <div class="v-chart" v-if="on">
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import VeLine from 'v-charts/lib/line.common'
import echarts from 'echarts'
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
        on:false,
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
        list:[
            {
                img:require('@/common/img/icon-Order.png'),
                title:'设备订单',
                text:'可查看设备订单信息',
                name:'norder'
            },
            {
                img:require('@/common/img/icon-Rmb.png'),
                title:'设备分成',
                text:'设置代理商分成比例',
                name:'division'
            },
            {
                img:require('@/common/img/icon-product.png'),
                title:'产品管理',
                text:'可以添加所需产品'
            },
            {
                img:require('@/common/img/icon-List.png'),
                title:'产品参数',
                text:'设备所需参数设置'
            },
            {
                img:require('@/common/img/icon-Error.png'),
                title:'故障统计',
                text:'设备故障信息统计'
            },
            {
                img:require('@/common/img/icon-Turn.png'),
                title:'远程控制',
                text:'可远程控制设备开关'
            }
        ]
      }
    },
  components: {
    VeLine
  },
  computed: {
    all() {
      return parseInt(this.online)+parseInt(this.offline)
    }
  },
  methods: {
    show() {
      this.on= !this.on
    }
  }
}
</script>

<style scoped lang="scss">
.details {
  @include bg-fixed(0, 0, $bgColor, 9);
  overflow-y: scroll;
  .h-title {
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 28px;
    justify-content: space-between;
    .icon-img {
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
  }
  .heard {
    background: #fff;
    margin: 20px 0;
    div {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
    }
    .txt-2 {
      flex-direction: column;
      text-align: left;
      .v-border {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #333;
        display: inline-block;
        margin-right: 10px;
      }
      .yello {
        background: #ff8400;
      }
      .green {
        background: #51bf00;
      }
      p {
        padding: 5px 0;
        &:last-child {
          display: flex;
          justify-content: space-between;
        }
        span {
          display: flex;
          align-items: center;
          b {
            font-weight: normal;
            color: #8e8e8e;
          }
        }
      }
      border-bottom: 1px solid #efefef;
    }
    .txt-3 {
      font-size: 24px;
      b {
        font-weight: normal;
        color: #8e8e8e;
      }
      span {
        color: #0086f8;
        i {
          padding-right: 5px;
        }
      }
      .bor-r {
        border-right: 1px solid #efefef;
        padding-right: 15px;
      }
    }
  }
  .link-a {
    ul {
      @include clearfix;
      li {
        float: left;
        width: 50%;
        padding-bottom: 2px;
        padding-right: 2px;
        box-sizing: border-box;
        &:nth-of-type(2n) {
          padding-right: 0;
        }
        div {
          background: #fff;
          display: flex;
          padding: 30px 20px 15px;
          img {
            width: 80px;
            height: 80px;
            padding-right: 10px;
          }
        }
        p {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: -15px;
          b {
            font-size: 30px;
            padding-bottom: 5px;
          }
          span {
            color: #a8a8a8;
            font-size: 24px;
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
      .sum-d {
        position: relative;
        margin-top: 20px;
        .son-1 {
          display: inline-block;
          margin: 0 auto;
          b {
            font-size: 35px;
            display: block;
          }
          span {
            color: #a5a5a5;
            display: block;
          }
        }
        .son-2 {
          position: absolute;
          top: 0;
          right: 0;
          span {
            margin: 0 10px;
          }
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
