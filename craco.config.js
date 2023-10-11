const path = require('path')
const CracoLessPlugin = require('craco-less')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { getPlugin, pluginByName, whenProd } = require('@craco/craco')
const TerserPlugin = require('terser-webpack-plugin')
const { name } = require('./package.json')
const webpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isPro = (dev) => dev === 'production'
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

let envName = process.env['PROXY_ENV'] || 'dev' // 生产环境：online，开发环境： dev
let node_env = process.env['NODE_ENV1'] || process.env['NODE_ENV'] // 生产： production 开发：development
// 打包 build cross-env设置NODE_ENV 无效，一直默认是 production，使用 NODE_ENV1 代替
// console.log('env:', env, process.env.NODE_ENV, node_env, envName)
const PROXY = PROXY_CONFIG_MAP[envName]
const resove = (dir) => path.resolve(__dirname, dir)
const outPath = path.resolve(
  __dirname,
  '../../../../../',
  'tools/nginx/nginx-1.24.0/html/build',
)
module.exports = {
  webpack: {
    alias: {
      '@': resove('src'),
    },
    externals: {
      // 不打包 可设置 cdn资源
      // dayjs: 'dayjs',
    },
    configure: {
      output: {
        // publicPath: publicPath[node_env] + '/',
        path: outPath,
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        path: outPath, // 修改打包输出文件目录 两步都要写
        publicPath: whenProd(() => '/', '/'), // 静态资源publicpath
      }
      // 部分打包
      // webpackConfig.plugins.push(
      //   new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      // )
      webpackConfig.devtool = false

      // 线上替换cdn key:value key为库的名字 value为umd模块导出到global对象的key名
      whenProd(() => {
        webpackConfig.externals = {
          axios: 'axios',
        }
      })
      // 根据插件名获取插件 返回是否找到和匹配的插件
      const { isFound: isHtmlWebpackPluginFound, match: htmlWebpackPlugin } =
        getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin'))
      if (isHtmlWebpackPluginFound) {
        htmlWebpackPlugin.userOptions.title = whenProd(
          () => '生产环境',
          '开发环境',
        )
        // cdnurl要按照库的相互依赖优先级填写 被依赖的写前面优先加载
        htmlWebpackPlugin.userOptions.cdn = whenProd(
          () => ({
            js: ['https://cdn.bootcdn.net/ajax/libs/axios/1.2.5/axios.min.js'],
            css: [],
          }),
          // 本地环境设为空 防止页面遍历报错
          {
            js: [],
            css: [],
          },
        )
      }
      // 使用gzip压缩超过1M的js和css文件
      webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          threshold: 1024,
          minRatio: 0.8,
        }),
      )
      webpackConfig.optimization = {
        splitChunks: {
          chunks: 'all',
          minSize: 40000,
          maxAsyncRequests: 5, // 最大异步请求数
          maxInitialRequests: 4, // 页面初始化最大异步请求数
          automaticNameDelimiter: '~', // 解决命名冲突
          // name: true值将会自动根据切割之前的代码块和缓存组键值(key)自动分配命名,否则就需要传入一个String或者function.
          name: false,
          cacheGroups: {
            common: {
              name: 'chunk-common',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|redux-saga|dva|react-router-dom|draft-js\/lib|core-js|@antv\/data-set\/build|)[\\/]/,
              priority: -10,
            },
            antd: {
              name: 'chunk-antd',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@ant-design|antd|moment|immutable\/dist|rc-calendar\/es|braft-finder\/dist|lodash|rc-tree\/es)[\\/]/,
              priority: -11,
            },
            echarts: {
              name: 'chunk-echarts',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](echarts)[\\/]/,
              priority: 10,
            },
          },
        },
      }

      if (isPro(node_env)) {
        webpackConfig.plugins.push(new webpackBundleAnalyzer())
      }
      return webpackConfig
    },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: node_env === 'production' ? false : true,
          compress: {
            drop_console: node_env === 'production',
            // 生产环境下移除控制台所有的内容
            drop_debugger: false, //移除自动断点功能；
            // pure_funcs: ['console.log', 'console.error'], //配置移除指定的指令，如console.log,alert等
          },
          format: {
            comments: false, //删除注释
          },
        },
        extractComments: false, //是否将注释剥离到单独的文件中
      }),
    ],
  },
  devServer: {
    proxy: PROXY,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
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
