const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        devtool: 'source-map',
    },
    chainWebpack: (config) => {
        config.module
            .rule('i18n-resource')
            .test(/\.(json5?|ya?ml)$/)
            .include.add('/src/locales')
            .end()
            .type('javascript/auto')
            .use('i18n-resource')
            .loader('@intlify/vue-i18n-loader')
        config.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
            .loader('@intlify/vue-i18n-loader')
    },
})
