const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [{
        // 注意不要写成 '/\.css$/'
        test: /\.css$/,
        use: [
          // 创建style变迁，将js的央视资源插入
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          // 将css作为js模块加载到js中，内容是字符串
          'css-loader',
          // 下面这样写可以自定义配置，上方是默认配置
          /**
           默认采用的生产环境，这里不是webpack配置的环境
           是node运行时的临时参数 
           process.env.NODE_ENV = development
           "browerslist": {
          		"development": [
          			"last 1 chrome version",
          			"last 1 firefox version",
          			"last 1 safari version"
          		],
          		"production": [
          			">0.2%",
          			"not dead",
          			"not op_mini all"
          		]
          	}
           */
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // 帮助postcss找到package.json中的
                // browerlist， 
                // 可以在github 搜索browerslist查看需要的
                // 根据当中定义的环境，加载指定的兼容样式
                require('postcss-preset-env')(),

              ]
            }
          }
        ]
      },
      {
        // 注意不要写成 '/\.css$/'
        test: /\.less$/,
        use: [
          // 创建style变迁，将资源插入
          // 'style-loader',
          // 取代style-loader，提取css
          MiniCssExtractPlugin.loader,
          // 将css作为js模块加载到js中，内容是字符串
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 小8k，处理成base64
          // 减少资源请求, 会增加打包体积
          limit: 8 * 1024,
          // 在部分情况下，html中存在引入图片，打包后src成了[Object Modeule]
          // 原因是url-loader默认使用的es6的模块
          // 关闭es6的模块，使用commonjs
          esModule: false,
          name: 'name-[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 专门处理html中引入图片资源，让其被url-loader处理
        use: 'html-loader'
      },
      {
        exclude: /\.(css|js|html|less|png|jpg)$/,
        use: 'file-loader'
      },
      // 语法检查只需要查自己写的代码
      // 通过exclude排除第三方库的
      // 设置检查的规则，
      // package.json eslintconfig设置
      // 推荐使用 airbnb
      // eslint-config-airbnb-base eslint  eslint-loader eslint-plugin-import
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      // 1. js兼容性处理 babel-loader 
      // @babel/preset-env
      // 但是配置1 只能处理简单的语法转换
      // 类似promise等高阶语法就不行
      // 2. @babel/polyfill 这个能做全部的语法兼容, 但是代价也大，不管你需要不需要，都做了全部的兼容性
      // 推荐 3. 按需做兼容处理 core-js
      {
        test: /\.js$/,
        // include: './src',
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              "@babel/preset-env",
              {
                // 按需加载补丁
                "useBuiltIns": "usage",
                // 指定 corejs版本
                "corejs": {
                  "version": 3
                },
                // 具体到某个兼容版本
                "targets": {
                  // chrome 兼容到 60版本
                  "chrome": "60",
                  "firefox": "60",
                  "ie": "9",
                  "safari": "17"
                }
              }
            ]
          ],
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1. 帮助serviceWorker快速启动
       * 2. 删除旧的 serviceWorker
       * 生成一个serviceWorker配置文件
       */
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  mode: 'development', //development  production
  // 开发服务器devServer 只会在内存中打包编译
  // 不会有任何的输出, 启动指令是npx webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    compress: true,
    port: 3000,
    // 编译完打开浏览器
    open: true,
  }
}