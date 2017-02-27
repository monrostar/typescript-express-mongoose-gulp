var path                 = require("path");
var AssetsPlugin         = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
  path: path.join(__dirname, "dist", "assets")
});

module.exports = {
  entry : {
    client: path.join(__dirname, "client", "index.tsx")
  },
  output: {
    path      : path.join(__dirname, "dist"),
    publicPath: "/assets/",
    filename  : "[name].bundle.[chunkhash].js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [assetsPluginInstance],

  externals: {
    react      : 'React',
    'react-dom': 'ReactDOM'
  }
};