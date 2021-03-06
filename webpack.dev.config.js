const path = require('path');
const webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.tsx'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    port: 3000,
    compress: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      },
      "/auth": {
        target: "http://localhost:8080"
      },
      "/public": {
        target: "http://localhost:8080"
      }
    }
  },
  module: {
    rules: [
      {test: /\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", 'sass-loader']
        })
      },
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node-modules/},
      {test: /\.json$/, use: 'json-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  // Special setup for enzyme
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
}
