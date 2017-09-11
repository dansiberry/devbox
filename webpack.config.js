const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './assets/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: 'bundle.js',
  },
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "assets"),
          path.resolve(__dirname, "node_modules/jquery")
        ],
        use: [{
          loader: 'babel-loader'
        }],
      },
      {
      test: /\.jsx$/,
      include: [
        path.resolve(__dirname, "assets")
      ],
      use: [{
        loader: 'babel-loader'
      }],
      },
      { test: /\.css$/,
        use: [
          'style-loader',
          'css-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
}
