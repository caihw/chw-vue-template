const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const outputDir = process.env.VUE_APP_OUT_PUT_DIR;
const proxyUrl = process.env.VUE_APP_BASE_URL;
const pathRewrite = process.env.VUE_APP_INTERFACE_PREFIX;
module.exports = {
  // TODO: 等着重新配置
  publicPath: publicPath,
  outputDir: outputDir,
  devServer: {
    open: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      [proxyUrl]: {
        target: `http://${process.env.VUE_APP_IP}:${process.env.VUE_APP_PORT}`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [`^${proxyUrl}`]: pathRewrite //路径重写
        }
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  css: {
    sourceMap: process.env.NODE_ENV === "production"
  }
};
