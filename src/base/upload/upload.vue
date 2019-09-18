<template>
  <div class="page">
    <div id="upload-preview">
      <div class="upload-wrap" v-for="(item, index) in fileObj" :key="index">
        <div class="upload-preview-parent">
          <img class="opload-img-see" :src="item.URL" /><span
            class="upload-preview-del"
            @click="Delete(index)"
            ><span class="upload-x"></span
          ></span>
          <div class="upload-bg" v-show="item.bg"></div>
          <div class="el-progress" v-show="item.line">
            <div class="el-progress-bar">
              <div class="el-progress-bar-outer">
                <div class="el-progress-bar-inner" ref="progressWith"></div>
              </div>
            </div>
            <div class="el-progress-text">
              已上传<span>{{ item.progress }}</span>
            </div>
          </div>
          <div class="upload-error" v-if="item.errno">
            上传失败
          </div>
        </div>
        <p class="upload-priview-name" :title="item.name">
          {{ item.name }}
        </p>
      </div>
      <div id="upload-append" v-show="maxHide">
        <div class="upload-d">
          <label for="uoload-file" class="select-name"></label>
          <input
            ref="file"
            id="uoload-file"
            type="file"
            name="myfile"
            multiple=""
            @change="uplpadFile"
          />
          <!--上传速度显示-->
          <!-- <span id="time"></span> -->
        </div>
        <p class="upload-priview-name upload-switch-name">上传图片</p>
        <!-- <img class="upload-defalut" src="/image/pic.png" > -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    img:{
      type:Array,
      default:() => ["jpg","jpeg","png","gif"]
    },
    maxLength: {
      type:Number,
      default:3
    },
    postURL:{
      type:String,
      default:""
    },
    params:{
      type:String,
      default:"img"
    }
  },
  data() {
    return {
      fileObj:[],
      maxHide:true,
      fileData:[],
      xhr:{},//异步请求对象
      ot:"", //时间
      oloaded:"",//大小
    }
  },
  methods:{
    uplpadFile(e) {
      let files=e.target.files
      console.log(files)
      // alert(Array.isArray(this.fileData))
      let fileDataOld = this.fileData.slice()
      let meta = []
      for (let i = 0; i < files.length; i++) {
        // 截取文件类型
        let name=files[i].type
        let fileName = name.substring(name.lastIndexOf("/")+1).toLowerCase();
          //多文件判断格式是否正确
          if (this.img.indexOf(fileName) > -1) {
            meta.push(true)
          }else {
            meta.push(false)
          }
      }
      if (meta.indexOf(false) > -1) {
          if (this.img.indexOf("jpeg") > -1) {
            this.$dialog.alert({message: `请选择${this.img}图片格式文件上传！`}).then(() => {});
          }
          e.target.value=""
      return false   //阻止submit提交
      }
      for (let i = 0; i < files.length; i++) {
      this.fileData.push(files[i])
      }
      if (this.fileData.length > this.maxLength) {
         this.$dialog.alert({message: '超过最大上传数量，请重新选择文件！'}).then(() => {});
        this.fileData = fileDataOld
        e.target.value=""
        return false
      }
            // 判断 预览是图片还是视频
        this.windowURL = window.URL || window.webkitURL;
          if (files) {
            for (let i = 0; i < files.length; i++) {
              let picURL = this.windowURL.createObjectURL(files[i])
              let name = files[i].name
              let obj={
                URL:picURL,
                name:name,
                progress:"0%",
                line:false,
                errno:false,
                bg:false
              }
              this.fileObj.push(obj)
              }
          }
          if (this.fileObj.length==this.maxLength) {
            this.maxHide=false
          }
           this.sub(files)
      e.target.value=""
    },
    sub(files) {
      /* let fileObj = document.getElementById("file").files; */ // js 获取文件对象
      if(files==undefined||files.length<1){
          this.$toast('请选择文件')
        return false
      }
      let $length=this.fileObj.length-files.length
      let url = this.postURL // 接收上传文件的后台地址
      let _this=this
      for (let i = 0; i < files.length; i++) {
        (function() {
          let form = new FormData() // FormData 对象
          let a = i+$length;
          form.append(_this.params, files[i]) // 文件对象
          _this.xhr = new XMLHttpRequest() // XMLHttpRequest 对象
          _this.xhr.open("post", url, true) //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
          _this.xhr.onload = function uploadComplete(evt) {
                  //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
                  for( let i of _this.fileObj){
                      i.bg=false
                  }

                  if(this.status == 200){
                    if(this.responseText && JSON.parse(this.responseText).code == 0){
                      // let obj = JSON.parse(evt.target.responseText)
                        _this.$toast('上传成功')
                      // uploadURL.push(obj.url);
                      // uploadPostURl=sumPostURl(uploadPostURl,uploadURL)
                    }else{
                        _this.$toast('上传失败')
                      // uploadURL.push("error");
                      // uploadPostURl=sumPostURl(uploadPostURl,uploadURL)
                        _this.fileObj[a].line=false
                      setTimeout(function(){
                        _this.fileObj[a].errno=true
                      },300)
                    }
                  }else {
                      _this.$toast('上传失败')
                    // uploadURL.push("error")
                    // uploadPostURl=sumPostURl(uploadPostURl,uploadURL)
                      _this.fileObj[a].line=false
                    setTimeout(function(){
                      _this.fileObj[a].errno=true
                    },300)
                  }
                } //请求完成
          _this.xhr.onerror = 	function uploadFailed(evt) {
                      // uploadURL.push("error");
                      for( let i of _this.fileObj){
                      i.bg=false
                      }
                      _this.fileObj[a].line=false
                      // $(".el-progress--line").eq(a).css("display","none");
                      _this.$toast('上传失败')
                      // uploadPostURl=sumPostURl(uploadPostURl,uploadURL);
                      setTimeout(function(){
                        _this.fileObj[a].errno=true
                      },300)
                    } //请求失败

          _this.xhr.upload.onprogress = function (e) {
            e = e || event
            for( let i of _this.fileObj){
              i.bg=true
            }
            if(e.lengthComputable) {
              _this.fileObj[a].line=true
              /*进度条显示进度*/
                _this.$refs.progressWith[a].style.width=Math.round(e.loaded / e.total * 100) + "%"
              _this.fileObj[a].progress=Math.round(e.loaded / e.total * 100)+"%"
              if (_this.fileObj[a].progress =="100%") {
                // eslint-disable-next-line no-inner-declarations
                function show(a){
                  _this.fileObj[a].line=false
                }
                // eslint-disable-next-line no-inner-declarations
                function _show(a)
                {
                    return function()
                    {
                        show(a);
                    }
                }
                setTimeout(_show(a),1000)
              }
            }
          } //【上传进度调用方法实现】
          _this.xhr.upload.onloadstart = function() { //上传开始执行方法
            _this.ot = new Date().getTime() //设置上传开始时间
            _this.oloaded = 0 //设置上传开始时，以上传的文件大小为0
          }
          _this.xhr.send(form) //开始上传，发送form数据
        })(i)
      }
    },
    Delete(index) {
      let _this = this
      let _index=index
      this.$dialog.confirm({
        message: '确认删除该文件吗？'
        }).then(() => {
          if (_this.fileData.length>0) {
        _this.fileData.splice(_index,1)
        // uploadURL.splice(_index,1)
        // uploadPostURl=sumPostURl(uploadPostURl,uploadURL)
        _this.fileObj.splice(index,1)
        if(_this.fileData.length <_this.maxLength) {
          _this.maxHide=true
        }
      }
      _this.$toast('删除成功')
        }).catch(() => {
          // on cancel
      });
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
#upload-content {
  padding: 16px;
  border-radius: 2px;
}

.upload-header {
  display: flex;
  justify-content: row;
}
.upload-star {
  margin-right: 18px;
}
.upload-star span {
  color: red;
}
#uoload-file {
  display: none;
}
#uoload-file:focus {
  outline: none;
}
.upload-d {
  position: relative;
  transition: transform 0.25s ease;
  height: 100%;
  overflow: hidden;
}
.select-name {
  text-align: center;
  width: 100%;
  height: 100%;
  color: #bbb;
  display: inline-block;
  cursor: pointer;
  transition: transform 0.5s ease;
}
.select-name::before,
.select-name::after {
  content: '';
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
}
.select-name::before {
  margin-top: -3px;
  margin-left: -25px;
  border-top: 6px solid;
}
.select-name::after {
  margin-top: -25px;
  margin-left: -3px;
  border-left: 6px solid;
}
.select-name:hover {
  transform: scale(1.3);
}
video {
  border-radius: 4px;
}

#upload-append {
  width: 165px;
  height: 110px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  border: 2px dashed #ddd;
}
.upload-preview-parent {
  position: relative;
  transition: transform 0.25s ease;
  height: 100%;
  overflow: hidden;
}

.upload-wrap {
  width: 165px;
  height: 110px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  margin-right: 20px;
  border: 1px solid #eee;
  &:nth-of-type(3n) {
    margin-right: 0;
  }
}
.upload-error {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(201, 48, 44, 0.8);
  top: 50%;
  left: 50%;
  padding: 2%;
  font-size: 12px;
  width: 100%;
  font-weight: bold;
}
// .upload-preview-parent:hover .upload-preview-del {
//   display: block;
// }
.el-progress {
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
}
.upload-bg {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-progress-bar {
  width: 70%;
  margin-top: 10%;
}
.el-progress-bar-outer {
  height: 5px;
  overflow: hidden;
}
.el-progress-bar-inner {
  width: 0%;
  background-color: #0099cc;
  height: 100%;
}
.el-progress-text {
  font-size: 12px;
  position: absolute;
  line-height: 20px;
  top: 35%;
  transform: translate(-50%);
  left: 50%;
  color: white;
}
.upload-preview-del {
  position: absolute;
  right: -35px;
  top: -35px;
  color: #fff;
  cursor: pointer;
  width: 70px;
  height: 70px;
  background-color: #624d8a;
  text-align: center;
  line-height: 20px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50%;
}
.opload-img-see {
  height: 100%;
  width: 100%;
}
.opload-video-see {
  width: 100%;
}
.upload-p {
  text-align: center;
}
.upload-btn {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  padding: 10px 20px;
  margin: 0 20px;
  border-radius: 5px;
  cursor: pointer;
}
.upload-sub {
  background-color: #00a0e9;
}
.upload-sub:hover {
  background-color: #0d73a2;
}
.upload-defalut {
  width: 150px;
}

.upload-color-out {
  color: #60c7e9;
  margin: 20px 90px 20px;
  background: #e5f5fa;
  padding: 20px;
}
.upload-priview-name {
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8a8a8a;
  font-weight: bold;
}
.upload-x {
  color: #fff;
  font-size: 14px;
  top: 40px;
  left: 14px;
  position: absolute;
}

.upload-x::before {
  content: 'X';
  color: #fff;
  font-size: 22px;
}
</style>
