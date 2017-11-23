var webpack = require("webpack");
var path = require("path");
var utils = require("./utils");
var config = require("../config");
var vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  "entry": {
    "app": ["babel-polyfill", "./src/main.js"]
    // app: './src/main.js'
  },
  "plugins": [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  "output": {
    "path": config.build.assetsRoot,
    "filename": "[name].js",
    "publicPath": process.env.NODE_ENV === "production" ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  "resolve": {
    "extensions": [".js", ".vue", ".json"],
    "alias": {
      "vue$": "vue/dist/vue.esm.js",
      "src": resolve("src"),
      "directives": resolve("src/directives"),
      "@": resolve("src")
    }
  },
  "module": {
    "rules": [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        "test": /\.vue$/,
        "loader": "vue-loader",
        "options": vueLoaderConfig
      },
      {
        "test": /\.js$/,
        "loader": "babel-loader",
        "include": [resolve("src"), resolve("test")]
      },
      {
        "test": /\.(gif|jpe?g|png|woff|woff2|svg|otf|eot|ttf)\??.*$/,
        "loader": "url-loader",
        "options": {
          "limit": 10000,
          "name": utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        "test": /\.scss$/,
        "use": [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            "loader": "postcss-loader",
            "options": { // 如果没有options这个选项将会报错 No PostCSS Config found
              "plugins": (loader) => [
                require("postcss-px2rem")({"remUnit": 16}),
                require("postcss-import")({"root": loader.resourcePath}),
                require("autoprefixer")({"browsers": ["ie>=8", ">1% in CN"]}), // CSS浏览器兼容
                require("cssnano")() // 压缩css
              ]
            }
          }
        ]
      }
    ]
  }
};
