const MODE = 'development';
const path = require('path');
const src = path.resolve(__dirname, './client/src');
const dist = path.resolve(__dirname, './dist');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: MODE,
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.vue', '.js', '.css'],
    alias: {
      '@Pages': path.resolve(__dirname, './client/src/js/pages'),
    },
  },
  entry: {
    app: [
      `${src}/js/index.js`
    ]
  },
  output: {
    filename: '[name].js',
    path: dist,
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    inline: true,
    port: 8000,
    hot: true,
  },
  module: {
    rules: [
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
        test: /\.css$/,
        exclude: /node-modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  }
};