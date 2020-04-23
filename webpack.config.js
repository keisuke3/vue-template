const webpack = require('webpack');
const path = require('path');
const src = path.resolve(__dirname, './client/src');
const outputPath = path.resolve(__dirname, './dist');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development';

  return {
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    plugins: [
      new VueLoaderPlugin(),
      new StyleLintPlugin({
        files: ['**/*.{vue,css,scss}'],
      })
    ],
    resolve: {
      extensions: ['.vue', '.js', '.css'],
    },
    entry: {
      app: [
        `${src}/js/index.js`
      ]
    },
    output: {
      filename: '[name].js',
      path: outputPath,
    },
    devServer: {
      open: true,
      contentBase: outputPath,
      watchContentBase: true,
      inline: true,
      port: 8000,
      hot: true,
      watchOptions: {
        ignored: /node_modules/
      },
    },
    optimization: {
      minimizer: IS_DEVELOPMENT
        ? []
        : [
            new TerserPlugin({
              terserOptions: {
                compress: { drop_console: true }
              }
            })
          ]
    },
    module: {
      rules: [
        {
          test: /\.(vue|js)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.vue$/,
          exclude: /node-modules/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: /node-modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css$|scss)$/,
          exclude: /node-modules/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                }
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ]
              },
            },
            'sass-loader',
          ]
        }
      ]
    }
  }
};