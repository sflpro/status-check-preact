const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: `${__dirname}/src/index.js`,
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'date-fns',
    ],
  },
  output: {
    path: `${__dirname}/../public/`,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: `${__dirname}/src`,
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['../public'], {
      allowExternal: true,
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
  ],
};
