const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/js/index.jsx',
    './src/html/index.pug',
    './src/scss/global.scss'
  ],
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/js'),
      "node_modules",
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'file-loader?name=[name].html',
          {
            loader: 'extract-loader',
            options: {
              publicPath: null
            }
          },
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              doctype: 'html',
              pretty: true,
              inlineRuntimeFunctions: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot?)$/,
        use: [
          'file-loader?name=fonts/[name].[ext]',
        ]
      },
      {
        test: /\.(png|svg)$/,
        use: [
          'file-loader?name=images/[name].[ext]',
        ]
      }
    ]
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],

  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: distPath,
    proxy: {
      '/api': {
        target: 'http://localhost:5050/',
        pathRewrite: { '^/api': '' }
      }
    },
    quiet: true
  }
}

