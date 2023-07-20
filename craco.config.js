const path = require('path')
const CracoLessPlugin = require('craco-less')
const PROXY_CONFIG_MAP = {
  dev: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '/api': '/api',
      },
    },
  },
  st: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '/api': '',
      },
    },
  },
  uat: {},
}

let envName = process.env['PROXY_ENV'] || 'dev'
const PROXY = PROXY_CONFIG_MAP[envName]
const resove = (dir) => path.resolve(__dirname, dir)
module.exports = {
  webpack: {
    alias: {
      '@': resove('src'),
    },
    plugins: [],
  },
  devServer: {
    proxy: PROXY,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true },
        },
        modifyLessRule: function () {
          return {
            test: /.module.less$/,
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:6]',
                  },
                },
              },
              { loader: 'less-loader' },
            ],
          }
        },
      },
    },
    // `Ant Design`相关配置
    // {
    //   plugin: CracoAntDesign,
    //   options: {
    //     customizeThemeLessPath: path.join(__dirname, 'src/antd.customize.less'),
    //   },
    // },
  ],
}
