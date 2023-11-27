require('dotenv').config();

process.traceDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/assets/';

const ENV = process.env.NODE_ENV || 'production';
const PROD = ENV === 'production';

module.exports = {
  devtool: PROD ? 'source-map' : 'cheap-module-source-map',
  mode: ENV,
  entry: paths.appEntry,
  output: {
    path: path.join(paths.build, 'assets'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: PROD ? '[name].[contenthash].js' : '[name].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: PROD ? '[name].[contenthash].js' : '[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: PROD ? publicPath : '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  resolve: {
    alias: {
      dindin: paths.appSrc,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: false,
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    },
    plugins: [],
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    port: 8080,
    server: 'https',
  },
  module: {
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.gif$/],
            type: 'asset',
            generator: {
              filename: '[name].[hash:8].[ext]',
            },
          },
          {
            test: [/\.ttf$/, /\.woff(2)$/],
            type: 'asset/resource',
            generator: {
              filename: '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              configFile: path.join(paths.appSrc, "tsconfig.json"),
              getCustomTransformers: () => ({
                before: [ PROD ? false : require('react-refresh-typescript')()].filter(Boolean)
              }),
              transpileOnly: !PROD,
            },
            //exclude: [ paths.server, paths.nodeModules ]
          },
          // Process CSS
          {
            test: /\.css$/,
            include: paths.appSrc,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  import: true,
                  modules: {
                    namedExport: false,
                    localIdentName: '[local]--[hash:base64:5]',
                    exportLocalsConvention: 'camelCaseOnly',
                  },
                  importLoaders: 1,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                      ['postcss-preset-env', {
                        stage: 0,
                        preserve: false,
                        features: {
                          'nesting-rules': true,
                        }
                      }],
                    ],
                  },
                },
              },
            ]
          },
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          },
          {
            // All other imported files. Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
            generator: {
              filename: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerHost: '0.0.0.0' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new WebpackPwaManifest({
      name: 'Din Din',
      short_name: 'Din Din',
      description: 'Meal tracking and yumminess.',
      theme_color: '#ff9e01',
      background_color: '#655643',
      display: 'fullscreen',
      scope: '/',
      start_url: '/',
      ios: true,
      inject: true,
      icons: [{
          src: path.join(paths.appManifest, '72.png'),
          sizes: '72x72',
          type: 'image/png'
      }, {
          src: path.join(paths.appManifest, '96.png'),
          sizes: '96x96',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, 'apple-120.png'),
          sizes: '120x120',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, '128.png'),
          sizes: '128x128',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, '144.png'),
          sizes: '144x144',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, 'apple-180.png'),
          sizes: '180x180',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, '192.png'),
          sizes: '192x192',
          type: 'image/png',
          ios: true
      }, {
          src: path.join(paths.appManifest, '512.png'),
          sizes: '512x512',
          type: 'image/png',
          ios: true
      }]
    }),
    PROD ? false : new ReactRefreshWebpackPlugin({ overlay: false }),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: path.join(paths.appSrc, "tsconfig.json")}
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    //   HASURA_GRAPHQL_ADMIN_SECRET: '',
    // }),
  ].filter(Boolean),
  // Turn off performance hints during development. Because we don't do any
  // splitting or minification in interest of compilation speed, these warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
