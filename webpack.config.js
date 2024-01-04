/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const ImageConfigWebpackPlugin = require('@pieced/image-config-webpack-plugin');
const FontConfigWebpackPlugin = require('@pieced/font-config-webpack-plugin');
const JsConfigWebpackPlugin = require('@pieced/js-config-webpack-plugin');
const StyleConfigWebpackPlugin = require('@pieced/style-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const resolve = (dir) => path.join(process.cwd(), dir);

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: './client/main',
  output: {
    path: resolve('dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('client'),
    },
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 6001,
    static: true,
  },
  plugins: [
    new WebpackBarPlugin(),
    new ImageConfigWebpackPlugin(),
    new FontConfigWebpackPlugin(),
    new JsConfigWebpackPlugin(),
    new StyleConfigWebpackPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.ejs',
      inject: true,
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  performance: {
    hints: false,
  },
  stats: 'errors-only',
};
