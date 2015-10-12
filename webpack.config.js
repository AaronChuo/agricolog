// Run like this:
// cd client && node server.js

const path = require('path');
const webpack = require('webpack');

const config = {
  // the project dir
  //context: __dirname,
  entry: ['./assets/javascripts/index'],

  // In case you wanted to load jQuery from the CDN, this is how you would do it:
  // externals: {
  //   jquery: 'var jQuery'
  // },
  resolve: {
    root: [path.join(__dirname, 'scripts'),
           path.join(__dirname, 'assets/javascripts'),
           path.join(__dirname, 'assets/stylesheets')],
    extensions: ['','.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
    alias: {
      components: path.join(__dirname, 'assets/javascripts/react/components/'),
      pages: path.join(__dirname, 'assets/javascripts/react/pages/'),
      actions: path.join(__dirname, 'assets/javascripts/flux/actions/'),
      stores: path.join(__dirname, 'assets/javascripts/flux/stores/'),
      utils: path.join(__dirname, 'assets/javascripts/utils/')
    }
  },
  module: {
    loaders: []
  }
};

// We're using the bootstrap-sass loader.
// See: https://github.com/justin808/bootstrap-sass-loader
config.entry.push('webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server',
  './scripts/webpack_only'

  // custom bootstrap
  //'bootstrap-sass!./bootstrap-sass.config.js'
  );
config.output = {

  // this file is served directly by webpack
  filename: 'express-bundle.js',
  path: __dirname
};
config.plugins = [new webpack.HotModuleReplacementPlugin()];
config.devtool = 'eval-source-map';

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
  {test: /\.css$/, loader: 'style-loader!css-loader'},
  {
    test: /\.scss$/,
    loader: 'style!css!autoprefixer!sass?outputStyle=expanded' +
            '&includePaths[]=' + path.resolve(__dirname, './assets/stylesheets')
  },
  {test: /\.(jpg|gif|png)$/, loader: 'file', exclude: /node_modules/},

  // The url-loader uses DataUrls. The file-loader emits files.
  {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
  {test: /\.ttf$/, loader: 'file-loader'},
  {test: /\.eot$/, loader: 'file-loader'},
  {test: /\.svg$/, loader: 'file-loader'});

module.exports = config;
