const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let CopyWebpackPlugin;
try {
  CopyWebpackPlugin = require("copy-webpack-plugin");
} catch (_) {
  CopyWebpackPlugin = null;
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    minify: false,
  }),
];

if (CopyWebpackPlugin) {
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  );
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          esModule: false,
          sources: {
            list: [
              { tag: "img", attribute: "src", type: "src" },
              { tag: "img", attribute: "srcset", type: "srcset" },
              { tag: "link", attribute: "href", type: "src" },
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins,
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: true,
      reconnect: true,
      progress: true,
    },
  },
  mode: "development",
};
