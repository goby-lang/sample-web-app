const path = require('path');
module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}