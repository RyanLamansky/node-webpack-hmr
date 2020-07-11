// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const {
  HotModuleReplacementPlugin, DefinePlugin,
} = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV === "production" || (() => {
  const { argv } = process;
  const mode = argv.indexOf("--mode");
  if (mode > 0) {
    return argv[mode + 1] === "production";
  }
  return false;
})();

console.log(`Webpack running in ${isProduction ? "production" : "development"} mode.`);

const createModule = (target = "ES5") => ({
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target,
            },
          },
        },
      ],
    },
  ],
});

/** @type {import("webpack").Configuration} */
const commonConfig = {
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

/**
 * @param {string} name
 */
const createClientConfig = (name, target = "ES5") => {
  /** @type {import("webpack").Configuration} */
  const clientConfig = {
    ...commonConfig,
    module: createModule(target),
    entry: isProduction ? ["./src/entry/client.ts"] : ["webpack-hot-middleware/client", "./src/entry/client.ts"],
    output: {
      path: path.resolve(__dirname, "build/client"),
      filename: `${name}.js`,
    },
    plugins: [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            ecma: 2019,
          },
        }),
      ],
    },
  };

  if (isProduction) {
    if (name === "modern") {
      clientConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "webpack-bundle-analyzer.html",
      }));
    }
  } else {
    clientConfig.plugins.push(new HotModuleReplacementPlugin());
  }

  return clientConfig;
};

/** @type {import("webpack").Configuration} */
const serverConfig = {
  ...commonConfig,
  devtool: isProduction ? "source-map" : undefined,
  module: createModule("ES2019"),
  entry: isProduction ? "./src/productionStart.ts" : "./src/entry/server.ts",
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "build/server"),
    filename: "server.js",
  },
  target: "node",
  optimization: {
    minimize: false,
  },
  plugins: [new DefinePlugin({ BUILD_DATE: new Date().getTime() })],
};

module.exports = [createClientConfig("modern", "ES2019"), createClientConfig("legacy", "ES5"), serverConfig];
