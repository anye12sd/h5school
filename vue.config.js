const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    proxy: {
      "/": {
        "target": "http://192.168.1.124:8081",
        "changeOrigin": true,
        "secure": true,
        "ws" : false,
        "pathRewrite": {
          "^/": "/"
        }
      },
    }
  }
})
