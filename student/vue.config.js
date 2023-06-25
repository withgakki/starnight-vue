const { environment } = require('./config/environment.js')

module.exports = {
  devServer: {
    port: 80,
    proxy: {
      '/': {
        target: environment.baseURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
  }
}