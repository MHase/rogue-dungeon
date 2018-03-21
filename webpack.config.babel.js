import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

// Phaser webpack config
// const phaserModule = path.join(__dirname, '/node_modules/phaser/');
// const phaser = path.join(phaserModule, 'src/phaser.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js'),
    ],
    vendor: ['phaser'],
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: './build/',
    filename: 'bundle.js',
  },
  watch: true,
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      // minify: {
      //   removeAttributeQuotes: false,
      //   collapseWhitespace: false,
      //   html5: false,
      //   minifyCSS: false,
      //   minifyJS: false,
      //   minifyURLs: false,
      //   removeComments: false,
      //   removeEmptyAttributes: false,
      // },
      hash: false,
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build'],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
      {
        test: /\.(eot|ttf|svg|woff|otf|woff2)$/i,
        include: path.resolve('./', 'src/assets/fonts'),
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]&limit=1000',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/node_modules/, path.resolve('src/fonts')],
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /\.(mp3|oog|wmv|json)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // resolve: {
  //   alias: {
  //     phaser,
  //   },
  // },
};
