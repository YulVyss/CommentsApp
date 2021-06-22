// Module system CommonJs (node.js)

const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    clientLogLevel: 'none'
  },
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve('./build')
  },
  watch: this.watch,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  }
};