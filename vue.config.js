const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
  // devServer: {
  //   proxy: 'https://localhost:7081'
  // },
});
