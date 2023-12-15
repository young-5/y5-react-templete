module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    webpackConfig.externals = pluginOptions
    return webpackConfig
  },
}
