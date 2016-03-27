import _ from 'lodash';
import webpack from 'webpack';
import minimist from 'minimist';
import extractTextPlugin from 'extract-text-webpack-plugin';
import ngAnnotatePlugin from 'ng-annotate-webpack-plugin';

const argv = minimist(process.argv.slice(2));
const DEBUG = argv.release ? argv.release : argv._[0] === 'dev';
const VERBOSE = argv.verbose ? argv.release : argv._[0] === 'dev';

const AUTOPREFIXER_BROWSERS = JSON.stringify({
  browsers: [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24",
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"]
});


const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

const config = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: './dist/js/',
    filename: '[name].js',
    publicPath: './',
    sourcePrefix: '  ',
    library: 'main',
    libraryTarget: 'umd'
  },
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'source-map' : false,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': DEBUG,
      '__SERVER__': false,
      'process.env': {'NODE_ENV': DEBUG ? '"development"' : '"production"'}
    }),
    new extractTextPlugin("../css/[name].css"),
  ].concat(DEBUG ? [] : [
             new ngAnnotatePlugin(),
             new webpack.optimize.DedupePlugin(),
             new webpack.optimize.UglifyJsPlugin({
               sourceMap: false,
               mangle: false
             })
           ]),
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: extractTextPlugin.extract('style', 'css!sass!autoprefixer?' + AUTOPREFIXER_BROWSERS)
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=../css/fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=../css/fonts/[name].[ext]"
      },

      {
        test: /\.(gif|jpg|png|svg|swf)/,
        loader: 'file?name=../css/img/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};

export default config;
