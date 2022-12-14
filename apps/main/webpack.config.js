const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const resolve = (pathString) => {
  return path.resolve(__dirname, pathString);
};

const PATH = {
  src: resolve("./src"),
  dist: resolve("./dist"),
  public: "public/",
  assets: "assets/",
};

module.exports = (env = {}, argv = {}) => {
  const isDev = argv?.mode === "development" ? true : false;
  const isProd = !isDev;
  console.log(`MODE: [${isDev ? "Dev" : "Prod"}]`);

  console.debug("ENV:::", { env, argv, NODE_ENV: process.env.NODE_ENV });

  /** @type { import('webpack').Configuration } */
  const config = {
    target: isDev ? "web" : "browserslist",
    mode: isDev ? "development" : "production",
    devtool: isDev ? "source-map" : undefined,

    entry: {
      // "react-hot-loader/patch",
      //   shared: {
      //     import: [""],
      //     filename: `${PATH.assets}js/share.[name].js`,
      //     // runtime: "runtime",
      //   },
      main: {
        import: `${PATH.src}/index.tsx`,
        // dependOn: "shared",
      },
      //   ui: {
      //     import: "@apps/ui",
      //     chunkLoading: false,
      //     // filename: `${PATH.assets}js/ui.[name].js`,
      //     // dependOn: "shared",
      //   },
    },
    externals: {
      path: PATH,
    },
    output: {
      clean: true, // Clean the output directory before emit.
      filename: `${PATH.assets}js/[name].[hash:8].js`,
      path: PATH.dist,
      publicPath: "/",
      chunkFilename: `${PATH.assets}js/chunk.[name].[hash].js`,
      assetModuleFilename: `${PATH.assets}img/[hash][ext][query]`,
    },

    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              collapse_vars: true,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /node_modules/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          //   test: /\.css$/i,
          test: /\.(scss|css)$/i,
          //   test: /\.s[ac]ss$/i,
          use: [
            isDev
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  //   options: {
                  //     // publicPath: "css",
                  //     publicPath: (resourcePath, context) => {
                  //       return (
                  //         path.relative(path.dirname(resourcePath), context) + "/"
                  //       );
                  //     },
                  //   },
                },
            // "css-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                esModule: true,
                modules: {
                  //       //   namedExport: true,
                  auto: true,
                  //   mode: "icss",
                  //   mode: "pure",
                  //       // auto: (resourcePath)=>{return resourcePath.global},
                  localIdentName: isProd
                    ? "[local]--[hash:base64:5]"
                    : "[name]__[local]--[hash:base64:5]",
                },
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: () => [require("autoprefixer")],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          // use: [{ loader: "file-loader" }],
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      static: {
        directory: "./public",
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      // alias: {
      //     "react-dom": "@hot-loader/react-dom",
      // },
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // new CopyPlugin({
      //     patterns: [{ from: "public" }],
      // }),
      new HtmlWebpackPlugin({
        title: "...",
        hash: false,
        template: `${PATH.public}/index.html`,
        filename: "index.html",
        inject: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      }),

      // new CopyPlugin({
      //     patterns: [
      //         {
      //             from: `${PATH.src}/assets/img/`,
      //             to: `${PATH.assets}/img/`,
      //         },
      //     ],
      // }),
    ].concat(
      isProd
        ? new MiniCssExtractPlugin({
            filename: `${PATH.assets}css/[name].[contenthash:5].css`,
            experimentalUseImportModule: true,
            // filename: ({ chunk }) => `${chunk.name.replace("/js/", "/css/")}.css`,
            // chunkFilename: `${PATH.assets}css/[id].[contenthash:8].css`,
            // runtime: true,
            // ignoreOrder: false,
          })
        : []
    ),
  };

  return config;
};
