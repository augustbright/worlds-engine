const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.*'],
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      types: path.resolve(__dirname, 'src', 'types'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'index.html'),
    }),
    new GenerateSW()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  devtool: 'inline-source-map'
};
