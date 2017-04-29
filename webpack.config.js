var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['babel-polyfill', './front-source/scripts/main.js'],
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: path.join(__dirname, 'es6'),
        query: {
          presets: 'es2015',
        },
      },
      {
        test: /\.scss$/,
        loader: extractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=../images/[name].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new extractTextPlugin("./front-source/scss/[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      include: /bundle.js$/,
      minimize: true
    })
  ]
  // Create Sourcemaps for the bundle
  // devtool: 'source-map',
};
