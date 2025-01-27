const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const publicPath = isDevelopment ? 'http://localhost:8080/dist/' : './dist/';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: publicPath
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
            publicPath: publicPath
          }
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
        directory: path.join(__dirname, 'dist'),
        publicPath: '/dist'
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web'
  };
};