<template>
  <div class="map">
    <div class="divided-title">
      <div class="tube-title-city" @click="cityList">
        <i class="iconfont icon-didian"></i>
        <span>{{ city }}</span>
      </div>
      <div class="divided-title-input">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="请输入关键字..." disabled="disabled" />
      </div>
      <div class="switch-ico">
        <a href="#">
          <i class="iconfont icon-list"></i>
        </a>
      </div>
    </div>
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      v-show="mapLoad"
    >
      <bm-marker
        v-for="(item, index) in markerArr"
        :key="index"
        :position="item.point"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{
          url: require('@/common/img/maker-plant.png'),
          size: { width: 24, height: 27 },
          opts: {
            imageSize: { width: 24, height: 27 }
          }
        }"
        @click="point(item, $event)"
      ></bm-marker>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="showAddressBar"
        @locationSuccess="success"
        @locationError="error"
        :offset="offset"
        :locationIcon="icon"
      ></bm-geolocation
    ></baidu-map>
    <!--弹出设备信息 start-->
    <div class="infowindow" v-show="info_d">
      <div class="title">
        <div class="title-h">{{ info_item.title }}</div>
        <div class="on-line">
          <span :style="{ color: imgURL.color }">{{ imgURL.online }}</span
          ><img :src="imgURL.img" />
        </div>
      </div>
      <div class="muid">
        <div class="uid">
          编号：<span>{{ info_item.id }}</span>
        </div>
        <div class="time">{{ info_item.time }}到期</div>
      </div>
      <div class="city">
        <span>{{ distance }}m</span> | <span>{{ info_item.address }}</span>
      </div>
    </div>
    <div class="infowindow-bg" v-show="info_d" @click="closedBg"></div>
    <!--弹出设备信息 end-->
    <div class="provinces" v-show="provinces">
      <div class="v-heart">
        <h3>当前选择城市</h3>
        <p @click="closed">{{ city }}</p>
      </div>
      <provinces :data="cityData" @select="selectCity"></provinces>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import math from '@/common/js/city'
import provinces from '@/base/provinces/provinces'
export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      showAddressBar:false,
      info_item:{},
      info_d:false,
      startMk:'',
      centerPt:'',
      distance:'',
      mapLoad:'',
      city:'北京市',
      offset:{
        width: 20,
        height: 30
      },
      icon:{
        url: require("@/common/img/marker-ico.png"),
        size: {width: 40, height: 40},
        opts: {imageSize: {width: 40, height:40}}
      },
      markerArr : [
        {
            title: "百乐和园1号",
            point: {lng: 120.21828342469252,lat:30.2589830468249},
            address: "浙江省-杭州市-ddxx区-xx街道",
            id: 868926034722041,
            tel: "12306",
            time:"2019-06-18",
            signal: 0,
            port:true
        },  //满格
        {
            title: "百乐和园2号",
            point: {lng:120.21649234557005,lat:30.262755481271803},
            address: "浙江省-杭州市-xxff区-xx街道",
            id: 868926034722042,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 1,
            port: true
        },//3格
        {
            title: "百乐和园3号",
            point: {lng:120.21437547941858,lat:30.26565821322581},
            address: "浙江省-杭州市-xxrr区-xx街道",
            id: 868926034722043,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 2,
            port: false
        },//2格
        {
            title: "百乐和园4号",
            point: {lng:120.21940846348261,lat:30.26706721029661},
            address: "浙江省-杭州市-xggx区-xx街道",
            id: 868926034722044,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 3,
            port: true
        },//1格
        {
            title: "百乐和园5号",
            point: {lng:120.2201801359078,lat:30.25753300685445},
            address: "浙江省-杭州市-xxtt区-xx街道",
            id: 868926034722045,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 4,
            port: false
        },//无信号
        {
            title: "百乐和园6号",
            point: {lng:120.21502834580635,lat:30.264755431649444},
            address: "浙江省-杭州市-xxh区-xx街道",
            id: 868926034722046,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 5,
            port: false
        },//离线
        {
            title: "百乐和园7号",
            point: {lng:120.21602834580635,lat:30.265555431649444},
            address: "浙江省-杭州市-xx区-xx街道",
            id: 868926034722047,
            tel: "18500000000",
            time:"2019-06-18",
            signal: 6,
            port: true
        }//无法上传
    ],
    cityData:[],
    provinces:false
    }
  },
  computed:{
    imgURL() {
      let value={
        online:'',
        color:'',
        img:''
      }
      switch (this.info_item.signal) {
        case 0:
            value.online='在线'
            value.color='#10cb02'
            value.img=require('@/common/img/signal-four.png')
            break;
        case 1:
            value.online='在线'
            value.color='#10cb02'
            value.img=require('@/common/img/signal-three.png')
            break;
        case 2:
            value.online='在线'
            value.color='#10cb02'
            value.img=require('@/common/img/signal-two.png')
            break;
        case 3:
            value.online='在线'
            value.color='#10cb02'
            value.img=require('@/common/img/signal-one.png')
            break;
        case 4:
            value.online='无信号'
            value.color='#aaa'
            value.img=require('@/common/img/signal-no.png')
            break;
        case 5:
            value.online='离线'
            value.color='#e50000'
            value.img=require('@/common/img/signal-offline.png')
            break;
        case 6:
            value.online='未上报'
            value.color='#aaa'
            value.img=require('@/common/img/signal-unreported.png')
            break;
      }
      return value
    }
  },
  methods: {
    point(item,e) {
      console.log(e)
        this.info_item=item
        this.info_d=true
        this.distance=parseInt(e.target.map.getDistance( this.centerPt, e.target.point))


    },
    closedBg(){
        this.info_d=false
    },
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.mapLoad=map
      let geolocation=new BMap.Geolocation()
      let _this=this
      geolocation.getCurrentPosition(function(r){
        _this.city=r.address.city
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          _this.centerPt=r.point
          _this.startMk = new BMap.Marker(r.point,{
            icon:new BMap.Icon(
            require("@/common/img/marker-ico.png"),
            new BMap.Size(40, 40),
            {imageSize:new BMap.Size(40, 40)
            })
          })
        // 旋转
        try {
            window.addEventListener("deviceorientation", _this._orientationHandler, false);
        }
        catch (e) {
            console.log(e)
        }
          map.addOverlay(_this.startMk)
          map.panTo(r.point)
        }
        else {
          alert('failed'+this.getStatus())
        }
	  },{enableHighAccuracy: true})
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    success(e){
      e.target.C.removeOverlay(e.marker)
      e.target.C.removeOverlay(this.startMk)
      this.centerPt=e.point
      this.startMk = new BMap.Marker(e.point,{
        icon:new BMap.Icon(
        require("@/common/img/marker-ico.png"),
        new BMap.Size(40, 40),
        {imageSize:new BMap.Size(40, 40)
        })
      })
      e.target.C.addOverlay(this.startMk)
    },
    error(){
    },
    cityList() {
      this.provinces=true
      this.cityData=math
    },
     _orientationHandler(event) {
      if(this.startMk){
          this.startMk.setRotation(Math.round(event.webkitCompassHeading));
      }
    },
    selectCity(item) {
      this.mapLoad.centerAndZoom(item.name,15);
      this.city=item.name
      this.provinces=false
    },
    closed() {
       this.provinces=false
    }
  },
  components:{
    provinces
  }
}
</script>

<style scoped lang="scss">
.map {
  @include bg-fixed(0, 0, $bgColor, 8);
  .v-heart {
    width: 100%;
    text-align: left;
    height: 70px;
  }
  .v-heart h3,
  .v-list .wrapper .group h3 {
    background: #f5f5f5;
    color: #a3a3a3;
  }
  .v-heart p,
  .v-list .wrapper .group ul li {
    background: #fff;
    color: #508af6;
    font-size: 16px;
  }
  .v-heart p,
  .v-heart h3,
  .v-list .wrapper .group h3,
  .v-list .wrapper .group ul li {
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
  }
  .provinces {
    @include bg-fixed(0, 0, $bgColor, 12);
  }
  .divided-title {
    position: absolute;
    padding: 20px 0;
    box-sizing: border-box;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    z-index: 9;
    i {
      font-size: 28px;
    }
    .tube-title-city {
      padding: 15px 30px;
      border-right: 1px solid #ddd;
      width: 17%;
      display: flex;
      span {
        @include ellipsis;
      }
      i {
        padding-right: 10px;
      }
    }
    .divided-title-input {
      flex: 1;
      display: flex;
      align-items: center;
      i {
        padding: 0 10px 0 20px;
      }
      input {
        flex: 2;
        background: #fff;
        border: none;
      }
    }
    .switch-ico {
      padding: 15px 30px;
      border-left: 1px solid #ddd;
    }
  }
  .bm-view {
    width: 100%;
    height: 100%;
  }
  .infowindow {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 20px;
    background: #fff;
    border-radius: 10px;
    z-index: 11;
    .title {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      .on-line {
        span {
          border-right: 1px solid #ddd;
          padding-right: 10px;
        }
        img {
          padding-left: 10px;
          width: 35px;
        }
      }
    }
    .muid {
      padding: 0 20px 30px;
      display: flex;
      justify-content: space-between;
    }
    .city {
      text-align: left;
      padding: 20px;
      border-top: 1px solid #eee;
    }
  }
  .infowindow-bg {
    @include bg-fixed(0, 0, rgba(0, 0, 0, 0.3), 10);
  }
}
</style>
