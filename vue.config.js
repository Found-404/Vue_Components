const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        directoryAsNamespace: true, // 启用路径命名空间
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {},
    },
  },
});
