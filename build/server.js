const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('../typescript/webpack.config')

const compiler = webpack(config)

const server = new webpackDevServer(compiler, {
    historyApiFallback: true,
    contentBase: [ config.output.path, './assets' ],
    stats: {
        colors: true
    }
})
server.listen(9002, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:9002')
})