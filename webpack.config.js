const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, '.'),
      publicPath: '/',
      serveIndex: true
    },
    devMiddleware: {
      publicPath: '/'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web'
};