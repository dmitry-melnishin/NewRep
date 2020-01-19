const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// don't forget to require plugins

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "./style.css" }),
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new CleanWebpackPlugin(["build"])
    ],
    mode: "development",
    devServer: {
      contentBase: "./build",
      port: 3000
    },
    devtool: isDev && "source-map",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(less|css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"].concat(
            isDev ? ["less-loader"] : ["postcss-loader", "less-loader"]
          )
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ["file-loader"].concat(isDev ? [] : ["image-webpack-loader"])
        }
      ]
    }
  };
};
