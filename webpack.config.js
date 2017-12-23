const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

const devServerPort = 9000;

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: path.resolve(__dirname, 'src/index.js'),
  // Tell Weback to output our bundle to ./docs/bundle.js
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'cheap-eval-source-map',
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'bower_components')
    ],
    // ideally, we would use this for our imports, but
    // it's not working with Glitch and i'm not really sure why
    alias: {
      "~": path.resolve(__dirname, 'bower_components/')
    }
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    rules: [
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          { 
            loader: 'babel-loader',
            query: {
              plugins: ['transform-class-properties']
            }
          },
          { loader: 'polymer-webpack-loader' }
        ]
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: 'babel-loader'
        // Optionally exclude node_modules from transpilation except for polymer-webpack-loader:
        // exclude: /node_modules\/(?!polymer-webpack-loader\/).*/
      }
    ]
  },
  // Enable the Webpack dev server which will build, serve, and reload our
  // project on changes.
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: devServerPort,
    historyApiFallback: {
      index: '/'
    },
    // proxy: {
    //   "/emoji-caption/**/*.js": {
    //     target: `http://localhost:${devServerPort}`,
    //     pathRewrite: {"^/emoji-caption" : ""}
    //   }
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        AZURE_SUBSCRIPTION_KEY: JSON.stringify(process.env.AZURE_SUBSCRIPTION_KEY),
        AZURE_REGION: JSON.stringify(process.env.AZURE_REGION)
      },
    }),
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      inject: false
    }),
    // This plugin will copy files over for us without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015.
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
      to: 'bower_components/webcomponentsjs/[name].[ext]'
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/icons/*'),
      to: 'icons/[name].[ext]'
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'manifest.json'),
      to: 'manifest.json'
    }]),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
    new WebpackShellPlugin({onBuildEnd: ['nodemon server.js --watch server.js']}),    
  ]
};
