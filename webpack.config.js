var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var WebpackShellPlugin = require('webpack-shell-plugin');
var plugins = [];

plugins.push(
  new WebpackShellPlugin({
    onBuildEnd: ['ruby slim-watch.rb app/pages ./']
  }),
  new webpack.HotModuleReplacementPlugin()
);

var config = {
  module: {
    rules: [
        {
            test : /\.css$/, 
            loader: 'style-loader!css-loader'
        },
        {
            test : /\.styl$/, 
            loader: 'style-loader!css-loader!stylus-loader'
        },
        { 
          test: /\.html$/, 
          loader: "html-loader" 
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          loader: 'file-loader?name=app/js/[name].[ext]'
        }
    ]
  },
  plugins: plugins,
  devServer:{
  }
}

var libConfig = Object.assign({}, config, {
  name: 'Import Libraries',
  entry: './common.js',
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, 'app/js'),
  }
});

var moduleConfig = Object.assign({}, config, {
  name: 'Bundle modules',
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/js'),
    publicPath: '/app/js/'
  },
});

module.exports = [
  libConfig, moduleConfig
];
  

// module.exports = {
//   entry: ['./index.js'],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'app/js'),
//     publicPath: '/app/js/'
//   },
//   module: {
//     rules: [
//         {
//             test : /\.css$/, 
//             loader: 'style-loader!css-loader'
//         },
//         {
//             test : /\.styl$/, 
//             loader: 'style-loader!css-loader!stylus-loader'
//         },
//         { 
//           test: /\.html$/, 
//           loader: "html-loader" 
//         },
//         {
//           test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
//           loader: 'file-loader?name=app/js/[name].[ext]'
//         }
//     ]
//   },
//   plugins: plugins,
//   devServer:{
//   }
// }
