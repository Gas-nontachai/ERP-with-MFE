const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "auto", // แทน "http://localhost:3000/"
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:5120",
        changeOrigin: true,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/, // matches .css files only
        use: ["style-loader", "css-loader", "postcss-loader"], // we want to use css-loader and style-loader for css files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i, // matches png, svg, jpg, jpeg, gif
        type: "asset/resource", // built-in Asset modules
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // matches all those provided inside
        type: "asset/resource", // built-in Asset modules
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "container",
      // remotes: {
      //   products: "products@http://localhost:3001/remoteEntry.js",
      // },
      // shared: {
      //   react: {
      //     singleton: true,
      //     requiredVersion: "^19.1.0",
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     requiredVersion: "^19.1.0",
      //   },
      // },
    }),
  ],
};
