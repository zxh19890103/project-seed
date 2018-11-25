const webpack = require('webpack')
const webpackCfg = require('../typescript/webpack.config')

const compiler = webpack(webpackCfg)
compiler.run((err, stats) => {
    if (err) throw err
    process.stdout.write(
        stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n'
    )
})