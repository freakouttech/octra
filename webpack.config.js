const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: "production",
  devtool: "nosources-source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          "/node_modules",
          "/test/**/*",
        ],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "pg-native": "noop2",
      tedious: "noop2",
      sqlite3: "noop2",
      mysql2: "noop2",
    },
  },
};
