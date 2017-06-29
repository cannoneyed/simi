const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const webpack = require('webpack')


//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV

const ENV_DEVELOPMENT = NODE_ENV === 'development'
const ENV_PRODUCTION = NODE_ENV === 'production'
const ENV_TEST = NODE_ENV === 'test'

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

//=========================================================
//  LOADERS
//---------------------------------------------------------
const urlLoaderLimit = 128000
const loaders = {
  json: {
    test: /\.json$/,
    loader: 'json-loader',
  },
  js: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  img: {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader?limit=' + urlLoaderLimit,
  },
  ['font-woff']: {
    test: /\.woff2?(\?\S*)?$/,
    loader: 'url-loader?mimetype=application/font-woff&limit=' + urlLoaderLimit,
  },
  ['font-otf']: {
    test: /\.otf(\?\S*)?$/,
    loader: 'url-loader?limit=' + urlLoaderLimit,
  },
  ['font-eot']: {
    test: /\.eot(\?\S*)?$/,
    loader: 'url-loader?limit=' + urlLoaderLimit
  },
  ['font-ttf']: {
    test: /\.ttf(\?\S*)?$/,
    loader: 'url-loader?mimetype=application/octet-stream&limit=' + urlLoaderLimit
  },
  svg: {
    test: /\.svg(\?\S*)?$/,
    loader: 'url-loader?mimetype=image/svg+xml&limit=' + urlLoaderLimit
  },
}

const sharedLoaders = [
  'json',
  'img',
  'font-woff',
  'font-otf',
  'font-eot',
  'font-ttf',
  'svg'
].map(key => loaders[key])


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {}
module.exports = config

config.resolve = {
  extensions: ['', '.js', '.jsx'],
  modulesDirectories: ['node_modules'],
  root: path.resolve('.')
}

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  })
]

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.devtool = 'source-map'

  config.entry = {
    main: [
      './src/main'
    ],
    vendor: [
      'babel-polyfill',
      'classnames',
      'history',
      'react',
      'react-dom',
      'react-router',
    ]
  }

  config.output = {
    filename: '[name].js',
    path: path.resolve('./docs'),
    publicPath: '/'
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html'
    })
  )
}

config.context = path.join(__dirname)


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.entry.main.unshift(
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/dev-server'
  )

  config.module = {
    loaders: sharedLoaders.concat([
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {
        plugins: [
          [
            'react-transform',
            {transforms: [ {transform: 'react-transform-hmr', imports: ['react'], locals: ['module']} ]}
          ]
        ]
      }}
    ])
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    publicPath: config.output.publicPath,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.module = {
    loaders: sharedLoaders.concat([
      loaders.js,
    ])
  }

  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/img',
      to: 'img',
    }])
  )
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map'

  config.module = {
    loaders: [
      loaders.js,
      loaders.scss
    ]
  }
}
