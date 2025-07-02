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
    publicPath: "auto",
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    port: 3001,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "user_manage",
      filename: "remoteEntry.js",
      exposes: {
        "./UserManageApp": "./src/bootstrap",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^18.2.0",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.2.0",
        },
        zustand: {
          singleton: true,
          eager: true,
          requiredVersion: "^4.1.5",
        },
      },
    }),
  ],
};
