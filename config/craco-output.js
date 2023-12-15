const { whenProd } = require('@craco/craco')

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    whenProd(() => {
      webpackConfig.output.publicPath = pluginOptions.publicPath
    })
    return webpackConfig
  },
}
