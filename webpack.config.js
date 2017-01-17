/*eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    exclude: /\.global\.css$/,
    loader: ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
  },
  {
    test: /\.global\.css$/, 
    loader: ExtractTextPlugin.extract('css?sourceMap'),
  },
];

module.exports = [
  {
    entry: [
      'webpack-hot-middleware/client',
      './src/demo.js',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'demo.js',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('demo.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ],
    module: {loaders: loaders},
  },
  {
    entry: './src/CMSEditor.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'cms-editor.js',
      library: 'RichText',
      libraryTarget: 'umd',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    module: {loaders: loaders},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('cms-editor.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ],
  },
];

