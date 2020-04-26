const { resolve } = require('path')
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  publicPath: '/', // 配置根目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录（js,css,image）
  lintOnSave: false, // 是否开启eslint检测,false不开启，有效值：true || false
  productionSourceMap: true, // 生成环境下面开启sourceMap支持断点调试
  devServer: {
    open: true, // 是否启动打开浏览器
    // host: '0.0.0.0', // 主机，0.0.0.0支持局域网地址，可以用真机测试
    // port: 8080, // 端口
    https: false, // 是否启动https
    // 配置跨域代理http,https
    proxy: {
      '/api': {
        // http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f
        target: 'http://vueshop.glbuys.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': resolve(__dirname, 'src/assets')
      }
    },
    devtool: 'eval-source-map', // 配置开发者环境的sourceMap用于断点调试
    externals: {
      BMap: 'BMap'
    }
  }
}
