const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/App.jsx",
  },
  output: {
    filename: "[name].bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/jquery.js",
          to: "assets/jquery.js",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/assets/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Assets: path.resolve(__dirname, "src/assets"),
      Mocks: path.resolve(__dirname, "src/mocks"),
      Styles: path.resolve(__dirname, "src/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
          outputPath: "assets/",
          publicPath: "./assets/",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all", // Apply splitting to all types of chunks (initial, async, and `all`)
      cacheGroups: {
        vendor: {
          test: /node_modules/, // Target modules within node_modules
          name: "vendors", // Name of the vendor chunk
          priority: -10, // Lower priority than default cache groups
          reuseExistingChunk: true, // Reuse existing chunks if possible
        },
        styles: {
          name: "app",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    static: ["dist"],
    watchFiles: ["src/**/*.jsx"],
    client: {
      overlay: {
        warnings: false,
      },
    },
    hot: false,
    liveReload: true,
  },
};
