const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

const SRC_DIR = path.resolve(__dirname, 'app/src');
const PUBLIC_DIR = path.resolve(__dirname, 'app/public');
const BUILD_DIR = path.resolve(__dirname, 'app/build');

module.exports = {
  entry: {
    main: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        loader: 'react-hot',
        test: SRC_DIR,  //.js work?
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react', 'stage-0'] },
          exclude: /node_modules/,
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000 } },
      },
      {
        test: /\.jpg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: { limit: 8192, name: 'fonts/[name].[ext]?[hash]' },
      }],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: PUBLIC_DIR }]),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  stats: { colors: true },
  devtool: 'inline-source-map',
};

