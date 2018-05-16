'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    "./src/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "./www/"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      'less': path.resolve(__dirname, './less/'),
      'src': path.resolve(__dirname, './src/'),
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./static"),
    hot: true,
    inline: true,
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.less|.css$/,
        exclude: /\/node_modules/,
        loader: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({})
  ]
};