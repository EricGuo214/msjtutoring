module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/functions": {
        target: "http://localhost:5001",
        secure: false,
        pathRewrite: {
          "/functions": ""
        }
      }
    }
  }
}
