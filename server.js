/*eslint-disable no-console, func-names, no-var */
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');

var comments = {name: 'Steven Wang', age: '100'};

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  stats: {colors: true}
});

server.app.use(bodyParser.json(null));
server.app.use(bodyParser.urlencoded({extended: true}));

server.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8080...');
});
