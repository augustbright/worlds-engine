require('dotenv').config('./.env');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

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
      server: path.resolve(__dirname, 'src', 'server'),
      state: path.resolve(__dirname, 'src', 'state'),
      hook: path.resolve(__dirname, 'src', 'hook'),
      pages: path.resolve(__dirname, 'src', 'pages'),
      api: path.resolve(__dirname, 'src', 'api'),
      func: path.resolve(__dirname, 'src', 'func'),
      modules: path.resolve(__dirname, 'src', 'modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|ico)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'index.html'),
      favicon: path.join(__dirname, 'src', 'assets', 'favicon.ico')
    }),
    new DefinePlugin({}),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': process.env['API_PROXY_HOST'],
    },
    client: {
      logging: 'info'
    }
  },
  devtool: 'inline-source-map',
};
