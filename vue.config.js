// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    externals: {
      BMap: 'BMap'
    }
  },
  //配置全局样式变量
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/common/scss/common.scss";`
      }
    }
  },
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  }
}
