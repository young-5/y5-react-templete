const path = require('path')
const { whenProd, when } = require('@craco/craco')
const CompressionPlugin = require('compression-webpack-plugin')
const cracoExternals = require('./config/craco-externals')
const cracoOut = require('./config/craco-output')
const CracoLessPlugin = require('craco-less')
const { name } = require('./package.json')
const PROXY_CONFIG_MAP = {
  dev: {
    '/api': {
      target: 'http://localhost:5000',
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

const envName = process.env['PROXY_ENV'] || 'dev'
const PROXY = PROXY_CONFIG_MAP[envName]
const resove = (dir) => path.resolve(__dirname, dir)
module.exports = {
  webpack: {
    alias: {
      '@': resove('src'),
    },
    configure: {
      output: {
        // publicPath: publicPath[process.env.NODE_ENV] + '/',
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
      devtool: false,
    },
    plugins: {
      add: [
        // 变量替换
        // new webpack.DefinePlugin({"xxx":"xxx"})
        // 压缩
        // ...whenProd(() => {
        //   return [
        //     new CompressionPlugin({
        //       test: /\.(js|css|png|svg|jpg|jpeg|webp|woff2?|ttf|eot)$/,
        //     }),
        //     // process.env.ANALAYZE === 'true' &&
        //     //   new BundleAnalyzerPlugin({
        //     //     analyzerMode: 'static',
        //     //     openAnalyzer: flase,
        //     //   }).filters(Boolean),
        //   ]
        // }),
      ],
    },
  },
  devServer: {
    proxy: PROXY,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    // 输出配置
    {
      plugin: cracoOut,
      options: {
        publicPath: process.env.PUBLIC_URL ?? './',
      },
    },
    // 使用css-module规范 使用 less
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
    // ...whenProd(() => [
    //   //公共资源不打包
    //   {
    //     plugin: cracoExternals,
    //     options: {
    //       react: 'React',
    //     },
    //   },
    // ]),
    // 输出 html
    // ...
    // `Ant Design`相关配置
    // {
    //   plugin: CracoAntDesign,
    //   options: {
    //     customizeThemeLessPath: path.join(__dirname, 'src/antd.customize.less'),
    //   },
    // },
    // 按需引入
    // 【'import',{libraryName:'antd',style:true,librayDirectory:"es"}】
    // 样式配置
    //  style {module:{},postcss:{}}
  ],
}
