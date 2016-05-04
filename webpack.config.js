var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/components/index'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    },
    plugins: [
      new ExtractTextPlugin('css/style.css', {
          allChunks: true
      })
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js'
    }
};