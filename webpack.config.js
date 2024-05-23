const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const asset = file => path.resolve('src/assets', file || '');
const public = file => path.resolve("public", file || '');

module.exports = {
  mode: 'development',
  entry: {
    app: [asset('scss/app.scss'), asset('js/app.js'),]
  },
  output: {
    path: public(),
    clean: true,
    chunkFilename: "[name].[contenthash].js"
  },
  stats: {modules: false, assetsSort: "size", assetsSpace: 50},
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ],
          }
        }
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {url: false, esModule: false,}
          },
          "postcss-loader",
          "sass-loader",
        ]
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns:
        [
          {from: asset('images'), to: public('images')},
          {from: asset('views'), to: public()},
        ]
    }),
  ],
};
