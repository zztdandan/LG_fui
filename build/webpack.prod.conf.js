"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var glob = require("glob");
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, "../src/pages");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const env = require("../config/prod.env");

// For NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash:8].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash:4].js")
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:8].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash:8].css")
    })
  ]
    .concat(
      utils.htmlPlugin()
      // new HtmlWebpackPlugin({
      //   filename: path.resolve(__dirname, "../dist/index.html"),
      //   template:  path.resolve(__dirname, "../src/pages/index/index.html"),
      //   inject: true,
      //   favicon: resolve("favicon.ico"),
      //   title: "index",
      //   chunks: ["index", "chunk-libs", "chunk-elementUI"],
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   }
      //   // default sort mode uses toposort which cannot handle cyclic deps
      //   // in certain cases, and in webpack 4, chunk order in HTML doesn't
      //   // matter anyway
      // }),
      // new HtmlWebpackPlugin({
      //   filename: path.resolve(__dirname, "../dist/cell.html"),
      //   template:  path.resolve(__dirname, "../src/pages/cell/cell.html"),
      //   inject: true,
      //   favicon: resolve("favicon.ico"),
      //   title: "cell",
      //   chunks: ["cell", "chunk-libs", "chunk-elementUI"],
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   }
      //   // default sort mode uses toposort which cannot handle cyclic deps
      //   // in certain cases, and in webpack 4, chunk order in HTML doesn't
      //   // matter anyway
      // })
    )
    .concat([
      //   // generate dist index.html with correct asset hash for caching.
      // // you can customize output by editing /index.html
      // // see https://github.com/ampedandwired/html-webpack-plugin

      new ScriptExtHtmlWebpackPlugin({
        //`runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      }),
      // keep chunk.id stable when chunk has no name
      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
          return chunk.name;
        }
        const modules = Array.from(chunk.modulesIterable);
        if (modules.length > 1) {
          const hash = require("hash-sum");
          const joinedHash = hash(modules.map(m => m.id).join("_"));
          let len = nameLength;
          while (seen.has(joinedHash.substr(0, len))) len++;
          seen.add(joinedHash.substr(0, len));
          return `chunk-${joinedHash.substr(0, len)}`;
        } else {
          return modules[0].id;
        }
      }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "../static"),
          to: config.build.assetsSubDirectory,
          ignore: [".*"]
        }
      ])
    ]),
  // .concat(utils.htmlPlugin())
  optimization: {
    splitChunks: {
      chunks: "initial",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        'default':false,
        vue:{
          name: "vue",
          //chunks:'initial',
          test: /vue/,//正则规则验证，如符合就提取chunk放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空
          //enforce: true,//优先处理
          priority: 17,
        },
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 15,
          minChunks: 1,
          enforce: true,//优先处理
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        // views:{
        //   name: "views",
        //   test: /[\\/]src[\\/]views[\\/]/,
        //   priority: 18,
        //   minChunks: 1,
        //   // enforce: true,//优先处理
        //   chunks: "initial" // 只打包初始时依赖的第三方
        // },
        ele: {
          name: "ele", // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        // lgUI: {
        //   name: "chunk-lgUI", // 单独将 elementUI 拆包
        //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        //   test: /[\\/]node_modules[\\/]lg-vue-ui[\\/]/
        // }
      }
    },
    runtimeChunk: "single",
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          }
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin()
    ]
  }
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8080,
        generateStatsFile: false
      })
    );
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "bundle-report.html",
        openAnalyzer: false
      })
    );
  }
}

module.exports = webpackConfig;

//  function htmlPlugin1() {
//   let entryHtml = glob.sync(PAGE_PATH + "/*/*.html");
//   let arr = [];
//   entryHtml.forEach(filePath => {
//     let filename = filePath.substring(
//       filePath.lastIndexOf("/") + 1,
//       filePath.lastIndexOf(".")
//     );
//     let conf = {
//       filename: path.resolve(__dirname, "../dist/" + filename + ".html"),
//       template: path.resolve(
//         __dirname,
//         "../src/pages/" + filename + "/" + filename + ".html"
//       ),
//       // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
//       chunks: [filename, "chunk-libs", "chunk-elementUI"],
//       title: filename,
//       inject: true
//     };
//     if (process.env.NODE_ENV === "production") {
//       conf = merge(conf, {
//         minify: {
//           removeComments: true,
//           collapseWhitespace: true,
//           removeAttributeQuotes: true
//         }
//         // chunksSortMode: 'dependency'
//       });
//     }
//     arr.push(new HtmlWebpackPlugin(conf));
//   });
//   return arr;
// };

//  function htmlPlugin2() {
//   return [
//     new HtmlWebpackPlugin({
//       filename: path.resolve(__dirname, "../dist/index.html"),
//       template: path.resolve(__dirname, "../src/pages/index/index.html"),
//       inject: true,
//       favicon: resolve("favicon.ico"),
//       title: "index",
//       chunks: ["index", "chunk-libs", "chunk-elementUI"],
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeAttributeQuotes: true
//         // more options:
//         // https://github.com/kangax/html-minifier#options-quick-reference
//       }
//       // default sort mode uses toposort which cannot handle cyclic deps
//       // in certain cases, and in webpack 4, chunk order in HTML doesn't
//       // matter anyway
//     }),
//     new HtmlWebpackPlugin({
//       filename: path.resolve(__dirname, "../dist/cell.html"),
//       template: path.resolve(__dirname, "../src/pages/cell/cell.html"),
//       inject: true,
//       favicon: resolve("favicon.ico"),
//       title: "cell",
//       chunks: ["cell", "chunk-libs", "chunk-elementUI"],
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeAttributeQuotes: true
//         // more options:
//         // https://github.com/kangax/html-minifier#options-quick-reference
//       }
//       // default sort mode uses toposort which cannot handle cyclic deps
//       // in certain cases, and in webpack 4, chunk order in HTML doesn't
//       // matter anyway
//     })
//   ];
// };
